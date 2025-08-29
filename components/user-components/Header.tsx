import Link from "next/link";
import { ModeToggle } from "@/components/ui/mode-toggle";
import ActionButtons from "@/components/user-components/ActionButtons";

const Header = () => {
  return (
    <header className="py-4 mb-4">
      <div className="flex items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold tracking-tight">T-Logs</h1>
        </Link>
        <div className="flex items-center gap-4">
          <ActionButtons />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
export default Header;
