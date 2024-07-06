import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Globe2Icon, GlobeIcon, LogOut } from "lucide-react";
import Link from "next/link";

import { UserButton } from "./auth/user-button";
// import { Badge } from "./ui/badge";
import { Badge } from "@/components/ui/badge";
import { currentRole } from "@/lib/auth";

export const NavbarRoutes = async () => {
  const role = await currentRole();
  return (
    <div className="  flex items-center justify-between mx-6  w-full">
      <Link href="/" className=" opacity-0">
        <Button size="sm" variant="outline">
          <GlobeIcon className=" h-4 w-4 mr-2" />
          Public View
        </Button>
      </Link>
      <div className=" self-end  flex items-center gap-4">
        {role && <Badge>{role}</Badge>}

        <UserButton />
      </div>
    </div>
  );
};
