"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa";
import { useCurrentUser } from "@/hooks/use-current-user";
import { DashboardIcon, ExitIcon } from "@radix-ui/react-icons";
import { LogoutButton } from "./logout-button";
import Link from "next/link";

export const UserButton = () => {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className=" border">
          <AvatarImage src={user?.image || ""} />
          <AvatarFallback className=" bg-primary">
            <FaUser className=" text-white" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className=" w-40" align="end">
        {user ? (
          <>
            <DropdownMenuItem>
              <DashboardIcon className="w-5 h-5 mr-2" />
              <Link href="/dashboard">Dashboard</Link>
            </DropdownMenuItem>

            <LogoutButton>
              <DropdownMenuItem className=" cursor-pointer">
                <ExitIcon className="w-5 h-5 mr-2" />
                Logout
              </DropdownMenuItem>
            </LogoutButton>
          </>
        ) : (
          <DropdownMenuItem>
            <Link href="/login">Login</Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
