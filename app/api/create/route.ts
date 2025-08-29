// post request to create a new blog post

import Blog from "@/models/blog.model";
import connectToDatabase from "@/lib/db/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import { getIdServerAction } from "@/lib/auth/getIdServerAction";

export async function POST(request: NextRequest) {
  await connectToDatabase();
  const { title, description, tags, image } = await request.json();

  if (!title) {
    return NextResponse.json({ message: "Title is required" }, { status: 400 });
  }

  if (!description) {
    return NextResponse.json(
      { message: "Description is required" },
      { status: 400 }
    );
  }

  if (!tags || tags.length === 0) {
    return NextResponse.json(
      { message: "Tags (at least one) are required" },
      { status: 400 }
    );
  }

  if (!image) {
    return NextResponse.json({ message: "Image is required" }, { status: 400 });
  }

  const userId = await getIdServerAction();

  if (!userId) {
    return NextResponse.json(
      { message: "Unauthorized: User not found" },
      { status: 401 }
    );
  }

  const post = await Blog.create({
    title,
    description,
    tags,
    image,
    author: userId,
  });

  if (!post) {
    return NextResponse.json(
      { message: "Failed to connect to database" },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { message: "Blog post created successfully" },
    { status: 201 }
  );
}
