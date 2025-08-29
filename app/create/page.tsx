import { auth } from "@/lib/auth/auth";
import CreateBlogPost from "@/app/create/create-blog-post";
import NotAuthorized from "@/components/user-components/Not-Authorized";

const page = async () => {
  const session = await auth();

  if (session?.user.role !== "admin") {
    return <NotAuthorized />;
  }
  return <CreateBlogPost />;
};
export default page;
