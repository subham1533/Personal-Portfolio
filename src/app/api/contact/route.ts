import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    // Insert into contact_messages
    const result = await query(
      `INSERT INTO contact_messages (name, email, message) 
       VALUES ($1, $2, $3) 
       RETURNING id, created_at`,
      [name, email, message]
    );

    const savedMessage = result.rows[0];

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
      data: savedMessage,
    });
  } catch (error) {
    console.error("Error saving contact message:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
