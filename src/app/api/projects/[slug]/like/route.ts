import { NextResponse } from "next/server";
import { query } from "@/lib/db";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    if (!slug) {
      return NextResponse.json({ error: "Project slug is required." }, { status: 400 });
    }

    // Upsert project stats and increment likes
    const result = await query(
      `INSERT INTO project_stats (project_slug, likes)
       VALUES ($1, 1)
       ON CONFLICT (project_slug)
       DO UPDATE SET likes = project_stats.likes + 1
       RETURNING likes`,
      [slug]
    );

    const updatedLikes = result.rows[0].likes;

    return NextResponse.json({
      success: true,
      slug,
      likes: updatedLikes,
    });
  } catch (error) {
    console.error("Error updating project likes:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
