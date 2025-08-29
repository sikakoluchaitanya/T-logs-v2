import BlogCard from "@/components/user-components/BlogCard";
import { PaginationBar } from "@/components/user-components/PaginationBar";
import axios from "axios";

interface PageProps {
  searchParams: Promise<{ page?: string }>;
}

const getBlogs = async (page: number) => {
  try {
    const response = await axios.get(
      `${
        process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"
      }/api/blog?limit=10&page=${page}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 404) {
      return { posts: [], currentPage: 1, totalPages: 0, totalPosts: 0 };
    }
    if (error.response?.status === 500) {
      console.error("Server error:", error.response.data.message);
      return { posts: [], currentPage: 1, totalPages: 0, totalPosts: 0 };
    }
    console.error("Failed to fetch blogs:", error);
    return { posts: [], currentPage: 1, totalPages: 0, totalPosts: 0 };
  }
};

const Home = async (props: PageProps) => {
  const searchParams = await props.searchParams;
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { posts, currentPage, totalPages, totalPosts } = await getBlogs(page);

  return (
    <main>
      <h2 className="my-8 text-xl font-bold tracking-tight">Latest Blogs</h2>
      <BlogCard blogs={posts} />
      {totalPosts > 0 && (
        <PaginationBar
          currentPage={currentPage}
          totalPages={totalPages}
          baseUrl="/"
        />
      )}
    </main>
  );
};

export default Home;
