import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  CalendarCheck,
  CircleDollarSign,
  File,
  LayoutDashboard,
  ListChecks,
} from "lucide-react";

import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner";

import { Actions } from "./_components/actions";

const UserDetailPage = async ({ params }: { params: { leaderId: string } }) => {
  const loggedInUser = await currentUser();

  if (!loggedInUser) {
    return redirect("/");
  }

  const user = await db.user.findUnique({
    where: {
      id: params.leaderId,
    },
  });

  if (!user) {
    return redirect("/");
  }

  return (
    <>
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">User Details</h1>
            <span className="text-sm text-slate-700">
              Review and update the user status
            </span>
          </div>
          <Actions
            leaderId={params.leaderId}
            isPublished={user.role === "LEADER"}
          />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-x-2 mt-6">
            <IconBadge icon={File} />
            <h2 className="text-xl">User Name</h2>
          </div>
          <p className="text-slate-700">{user.name}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">User Email</h2>
              </div>
              <p className="text-slate-700">{user.email}</p>
            </div>

            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">User Role</h2>
              </div>
              <p className="text-slate-700">{user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailPage;
