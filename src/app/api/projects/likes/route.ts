import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function GET() {
  try {
    const result = await query("SELECT project_slug, likes FROM project_stats");
    const likesMap: Record<string, number> = {};
    
    result.rows.forEach((row: any) => {
      likesMap[row.project_slug] = row.likes;
    });

    return NextResponse.json({
      success: true,
      likes: likesMap,
    });
  } catch (error) {
    console.error("Error fetching project likes:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
