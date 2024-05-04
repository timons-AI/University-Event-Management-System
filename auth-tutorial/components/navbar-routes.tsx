"use client";
// import { UserButton, useAuth } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";
import Link from "next/link";
// import { SearchInput } from "./search-input";
// import { isAdmin } from "@/lib/teacher";
import { Logo } from "@/app/(dashboard)/_components/logo";
export const NavbarRoutes = () => {
  const pathname = usePathname();

  return (
    <div className=" w-fit flex items-center justify-end">
      <div className="p-6 flex">
        <Logo />
      </div>

      <Link href="/admin/dashboard">
        <Button size="sm" variant="ghost">
          <LogOut className=" h-4 w-4 mr-2" />
          Institutional Administrator
        </Button>
      </Link>
      <Link href="/leader/dashboard">
        <Button size="sm" variant="ghost">
          <LogOut className=" h-4 w-4 mr-2" />
          Student Leader
        </Button>
      </Link>
      <Link href="/student/dashboard">
        <Button size="sm" variant="ghost">
          <LogOut className=" h-4 w-4 mr-2" />
          Student
        </Button>
      </Link>

      <Link href="/">
        <Button size="sm" variant="ghost">
          Public View
        </Button>
      </Link>
    </div>
  );
};
