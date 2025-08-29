import { getIdServerAction } from "@/lib/auth/getIdServerAction";
import SignIn from "./sign-in";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ActionButtons = async () => {
  const userId = await getIdServerAction();

  return (
    <>
      {userId ? (
        <div>
          <Button variant="default">
            <Link href="/create">Create Post</Link>
          </Button>
        </div>
      ) : (
        <SignIn />
      )}
    </>
  );
};
export default ActionButtons;
