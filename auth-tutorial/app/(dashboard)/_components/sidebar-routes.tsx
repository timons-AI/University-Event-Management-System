"use client";

// import { useAuth } from "@clerk/nextjs";
import {
  BarChart,
  Compass,
  Film,
  Globe2,
  Layout,
  List,
  PlaySquare,
  PlusCircle,
  Video,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { use, useEffect, useState } from "react";
import { usePreviewStore } from "@/hooks/use-preview";

import { SidebarItem } from "./sidebar-item";

const studentRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/student/dashboard",
  },
  {
    icon: Compass,
    label: "Events",
    href: "/student/events",
  },
  {
    icon: PlusCircle,
    label: "Create Events",
    href: "/student/create-events",
  },
  {
    icon: Globe2,
    label: "Published Events",
    href: "/",
  },
];

const leaderRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/leader/dashboard",
  },
  {
    icon: Compass,
    label: "Events",
    href: "/leader/events",
  },
  {
    icon: PlusCircle,
    label: "Create Events",
    href: "/leader/create-events",
  },
  {
    icon: Globe2,
    label: "Published Events",
    href: "/",
  },
];

const adminRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/admin/dashboard",
  },
  {
    icon: List,
    label: "Events",
    href: "/admin/events",
  },
  {
    icon: Globe2,
    label: "Published Events",
    href: "/",
  },
];

export const SidebarRoutes = () => {
  // const { userId } = useAuth();
  const pathname = usePathname();
  const isAdminPage = pathname?.includes("/admin");
  const isLeaderPage = pathname?.includes("/leader");
  const routeMapping = {
    admin: adminRoutes,
    leader: leaderRoutes,
    student: studentRoutes,
  };

  const userType = isAdminPage ? "admin" : isLeaderPage ? "leader" : "student";

  const loggedInRoutes = routeMapping[userType];
  // const [isPreviewRoute, setIsPreviewRoute] = useState(false); // Set the isPreviewRoute value to false by default

  const onOpen = usePreviewStore((state) => state.onOpen);
  const onClose = usePreviewStore((state) => state.onClose);
  const isPreview = usePreviewStore((state) => state.isPreview);

  useEffect(() => {
    // check if the pathname includes /preview
    if (pathname?.includes("/preview")) {
      onOpen();
      // if it doesn't, set isPreviewRoute to false
    } else {
      onClose();
    }

    // setIsPreviewRoute(isPreview);
  }, [pathname, isPreview, onOpen, onClose]);

  const routes = loggedInRoutes;

  return (
    <div className="flex flex-col w-full space-y-3">
      {routes.map((route) => (
        <SidebarItem
          key={route.href}
          icon={route.icon}
          label={route.label}
          href={route.href}
        />
      ))}
      {isPreview && ( // Conditionally render the preview routes only when isPreviewRoute is true
        <>
          <SidebarItem icon={Film} label="Preview " href="/preview" />
        </>
      )}
    </div>
  );
};
