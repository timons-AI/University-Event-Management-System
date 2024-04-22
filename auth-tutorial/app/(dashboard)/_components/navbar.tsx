import { NavbarRoutes } from "@/components/navbar-routes";
import MobileSidebar from "./mobile-navbar";
import Link from "next/link";
import { BellIcon, CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Navbar = () => {
  return (
    <div className="border-b h-full flex items-center bg-white shadow-sm ">
      <div className=" w-64 border-r h-full bg-white hidden md:flex items-center justify-between">
        <div className="flex h-[60px] items-center border-b p-2">
          <Link className="flex items-center gap-2 font-semibold" href="#">
            <CalendarIcon className="h-6 w-6" />
            <span className="">Event Manager</span>
          </Link>
        </div>
      </div>
      <MobileSidebar />
      <NavbarRoutes />
    </div>
  );
};
