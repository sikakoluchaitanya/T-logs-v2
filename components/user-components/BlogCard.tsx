import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Blog {
  _id: string;
  title: string;
  description: string;
  image?: string;
  createdAt: string;
  tags?: string[];
}

interface BlogCardProps {
  blogs: Blog[];
}

const BlogCard = ({ blogs }: BlogCardProps) => {
  if (!blogs || blogs.length === 0) {
    return (
      <div className="p-8 text-center text-muted-foreground">
        No blog posts found.
      </div>
    );
  }

  return (
    <>
      {blogs.map((blog) => (
        <article key={blog._id} className="my-4  cursor-pointer">
          <Link href={`/blog/${blog._id}`}>
            <div className="relative flex flex-col gap-4 p-4 rounded-md isolate hover:bg-muted/30">
              {/* {blog.image && (
                <div className="image">
                  <Image
                    src={blog.image}
                    alt={`${blog.title} cover image`}
                    width={400}
                    height={200}
                    className="object-cover w-full rounded-md aspect-video"
                  />
                </div>
              )} */}

              <time
                id="date"
                className="pl-2 border-l-2 border-muted-foreground/50"
              >
                <span className="text-sm text-muted-foreground">
                  {blog.createdAt &&
                    new Date(blog.createdAt).toLocaleDateString("en-US", {
                      weekday: "short",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                </span>
              </time>
              <div id="title">
                <h2 className="text-xl font-semibold">{blog.title}</h2>
              </div>

              <div id="content">
                <p className="line-clamp-3">{blog.description}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex flex-wrap gap-2">
                  {blog.tags &&
                    blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 text-xs rounded-full bg-muted"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
                <div className="flex items-center text-sm text-muted-foreground">
                  Read more
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>
            </div>
          </Link>
        </article>
      ))}
    </>
  );
};

export default BlogCard;
