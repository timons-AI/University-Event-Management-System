import { NavbarRoutes } from "@/components/navbar-routes";
import MobileSidebar from "./mobile-navbar";
import Link from "next/link";
import { BellIcon, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Navbar = () => {
  return (
    <div className="border-b h-full flex items-center justify-between bg-white shadow-sm ">
      <div className=" w-64 border-r h-full bg-white hidden md:flex items-center justify-between">
        <div className="flex h-[60px] items-center border-b p-2">
          <Link className="flex items-center w-full" href="#">
            <Image
              className="h-10 w-auto"
              src="/logo.jpg"
              width={40}
              height={40}
              alt="ISEM LOGO"
            />
          </Link>
        </div>
      </div>
      <div className=" w-full md:w-2/3 flex items-center justify-between">
        <MobileSidebar />
        <NavbarRoutes />
      </div>
    </div>
  );
};
