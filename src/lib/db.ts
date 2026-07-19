import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;

let pool: Pool | null = null;
let isMock = false;

// Mock database in-memory storage for gracefull fallback
const mockStorage = {
  messages: [] as any[],
  likes: {} as Record<string, number>,
};

if (connectionString) {
  try {
    pool = new Pool({
      connectionString,
      ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
    });
    console.log("PostgreSQL connection pool initialized.");
  } catch (error) {
    console.error("Failed to initialize PostgreSQL pool:", error);
    isMock = true;
  }
} else {
  console.warn("DATABASE_URL is not defined. Falling back to in-memory mock database.");
  isMock = true;
}

// Automatically create tables if using real DB
export async function initializeDatabase() {
  if (isMock || !pool) {
    return;
  }

  try {
    const client = await pool.connect();
    try {
      // Create contact_messages table
      await client.query(`
        CREATE TABLE IF NOT EXISTS contact_messages (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          email VARCHAR(255) NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        );
      `);

      // Create project_stats table
      await client.query(`
        CREATE TABLE IF NOT EXISTS project_stats (
          project_slug VARCHAR(100) PRIMARY KEY,
          likes INTEGER DEFAULT 0,
          views INTEGER DEFAULT 0
        );
      `);
      console.log("Database tables verified/created successfully.");
    } finally {
      client.release();
    }
  } catch (error) {
    console.error("Error during database initialization. Switching to mock mode:", error);
    isMock = true;
  }
}

// Trigger initialization in the background
initializeDatabase().catch(err => {
  console.error("Database initialization failed:", err);
});

export async function query(text: string, params?: any[]) {
  if (isMock || !pool) {
    // Return mock handlers for local dev without a DB
    if (text.includes("INSERT INTO contact_messages")) {
      const msg = {
        id: mockStorage.messages.length + 1,
        name: params?.[0],
        email: params?.[1],
        message: params?.[2],
        created_at: new Date(),
      };
      mockStorage.messages.push(msg);
      return { rows: [msg] };
    }

    if (text.includes("INSERT INTO project_stats") || text.includes("ON CONFLICT")) {
      // upsert like
      const slug = params?.[0];
      const current = mockStorage.likes[slug] || 0;
      mockStorage.likes[slug] = current + 1;
      return { rows: [{ project_slug: slug, likes: mockStorage.likes[slug] }] };
    }

    if (text.includes("SELECT") && text.includes("project_stats")) {
      const rows = Object.entries(mockStorage.likes).map(([slug, likes]) => ({
        project_slug: slug,
        likes,
      }));
      return { rows };
    }

    return { rows: [] };
  }

  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.log("Executed query", { text, duration, rowsCount: res.rowCount });
  return res;
}
