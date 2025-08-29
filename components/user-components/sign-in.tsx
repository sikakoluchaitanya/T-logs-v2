import { signIn } from "@/lib/auth/auth";
import { Button } from "../ui/button";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google");
      }}
    >
      <Button type="submit" className="cursor-pointer">
        Signin with Google
      </Button>
    </form>
  );
}
