import connectToDatabase from "@/lib/db/dbConnect";
import Blog from "@/models/blog.model";
import { NextRequest, NextResponse } from "next/server";

// Get request to get all blog posts with limit and page
export async function GET(request: NextRequest) {
  await connectToDatabase();
  // Get limit and page from URL params
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "10");
  const page = parseInt(searchParams.get("page") || "1");

  // Get the total count of posts to calculate total pages
  const totalPosts = await Blog.countDocuments();

  // Calculate the total number of pages
  const totalPages = Math.ceil(totalPosts / limit);

  // Get posts for the current page
  const posts = await Blog.find()
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 })
    .select("-__v");

  if (posts.length === 0) {
    return NextResponse.json({ message: "No posts found" }, { status: 404 });
  }

  if (!posts) {
    return NextResponse.json(
      { message: "Failed to fetch posts" },
      { status: 500 }
    );
  }

  // Process posts to extract first 50 words of description and remove HTML tags
  const processedPosts = posts.map((post) => {
    // Replace closing tags followed by opening tags with a space in between
    const textWithSpaces = post.description.replace(/<\/[^>]*><[^>]*>/g, " ");
    // Then remove all remaining HTML tags
    const plainText = textWithSpaces.replace(/<[^>]*>/g, "");
    const words = plainText.split(/\s+/);
    const truncatedDescription =
      words.slice(0, 50).join(" ") + (words.length > 50 ? "..." : "");

    return {
      ...post.toObject(),
      description: truncatedDescription,
    };
  });

  return NextResponse.json(
    {
      posts: processedPosts,
      currentPage: page,
      totalPages: totalPages,
      totalPosts: totalPosts,
    },
    { status: 200 }
  );
}
