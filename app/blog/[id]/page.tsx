import { Metadata } from "next";
import connectToDatabase from "@/lib/db/dbConnect";
import Blog from "@/models/blog.model";
import { notFound } from "next/navigation";
import Image from "next/image";
import "./styles.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getAuthorInfo } from "@/actions/getAuthorName";
import parse from "html-react-parser";
import { Badge } from "@/components/ui/badge";

// This is for generating metadata dynamically based on params
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;

  try {
    await connectToDatabase();
    const blog = await Blog.findById(id).select("title");

    if (!blog) {
      return {
        title: "Blog Post Not Found",
      };
    }

    return {
      title: blog.title,
    };
  } catch (error) {
    return {
      title: "Blog Post",
    };
  }
}

// Page component to render blog post details
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    await connectToDatabase();
    const blog = await Blog.findById(id);

    if (!blog) {
      notFound();
    }

    const { name, image } = await getAuthorInfo({ id: blog.author });

    return (
      <div className="max-w-4xl p-4 mx-auto blog-container">
        <h1 className="py-4 mb-4 text-sm font-bold tracking-tight border-b bg-background border-border">
          {blog.title}
        </h1>

        <div className="flex gap-4 items-center justify-start w-full">
          <p className="flex items-center gap-2 mb-4 text-sm text-muted-foreground">
            <Avatar className="z-10">
              <AvatarImage src={image} alt={name} />
              <AvatarFallback>{name.charAt(0) || "AB"}</AvatarFallback>
            </Avatar>
            {name}
          </p>

          <p className="text-sm text-muted-foreground">
            {blog.createdAt.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>

        {blog.image && (
          <div className="mb-8">
            <Image
              src={blog.image}
              alt={blog.title}
              className="w-full h-auto rounded-md aspect-video"
              width={1000}
              height={1000}
              priority
            />
          </div>
        )}

        <div className="flex flex-wrap gap-2 mb-4">
          {blog.tags.map((tag: string, index: number) => (
            <Badge variant="secondary" key={index} className="text-sm">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="prose prose-lg max-w-none">
          {parse(blog.description)}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return (
      <div className="max-w-4xl p-4 mx-auto">
        <h1 className="mb-4 text-3xl font-bold">Error</h1>
        <p>Failed to load blog post. Please try again later.</p>
      </div>
    );
  }
}
