"use client";

import { UserButton } from "@/components/auth/user-button";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const Navbar = () => {
  const pathname = usePathname();
  return (
    <nav className=" bg-secondary flex justify-between items-center p-4 w-full shadow-sm">
      <Image
        className="h-10 w-auto"
        src="/logo.jpg"
        width={40}
        height={40}
        alt="ISEM LOGO"
      />
      {/* <div className="flex justify items-center gap-x-4">
        <Button asChild variant={pathname === "/" ? "default" : "outline"}>
          <Link href="/">Home</Link>
        </Button>
        <Button
          asChild
          variant={pathname === "/listing" ? "default" : "outline"}
        >
          <Link href="/listing">Listings</Link>
        </Button>
      </div> */}
      <UserButton />
    </nav>
  );
};
