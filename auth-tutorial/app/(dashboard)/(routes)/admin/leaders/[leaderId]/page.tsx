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
import { UserForm } from "./_components/user-form";
import { ComboboxForm } from "./_components/users-form";

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

  const options = [
    { label: "Leader", value: "LEADER" },
    { label: "Admin", value: "ADMIN" },
    { label: "User", value: "USER" },
  ];

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
        <div className="p-6 space-y-3">
          <div className="flex items-center gap-x-2 mt-6">
            <IconBadge icon={File} />
            <h2 className="text-xl">User Name</h2>
          </div>
          <p className="text-slate-700 bg-slate-100 p-1 border rounded-md  w-fit">
            {user.name}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="space-y-3">
              <div className="flex items-center gap-x-2">
                <IconBadge icon={File} />
                <h2 className="text-xl">User Email</h2>
              </div>
              <p className="text-slate-700 bg-slate-100 p-1 border rounded-md w-fit">
                {user.email}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">User Role</h2>

                {/* <ComboboxForm />/ */}
              </div>
              {/* <p className="text-slate-700">{user.role}</p> */}
              <UserForm
                userId={params.leaderId}
                initialData={user}
                options={options}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetailPage;
