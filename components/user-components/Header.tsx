import Link from "next/link";
import { ModeToggle } from "@/components/ui/mode-toggle";
import ActionButtons from "@/components/user-components/ActionButtons";
import { Wrench } from 'lucide-react';

const Header = () => {
  return (
    <header className="py-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
        <Wrench className="mr-2 h-6 w-6" />
        <Link href="/">
          <h1 className="text-2xl font-bold tracking-tight">T-Logs</h1>
        </Link>
        </div>
        <div className="flex items-center gap-4">
          <ActionButtons />
          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
export default Header;
