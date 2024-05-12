"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className=" bg-secondary flex justify-between items-center p-4 rounded-xl w-[600px] shadow-sm">
      <div className="flex gap-x-2">
        <Button asChild variant={pathname === "/" ? "default" : "outline"}>
          <Link href="/">Home</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/listings" ? "default" : "outline"}
        >
          <Link href="/listings">Listings</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
};
