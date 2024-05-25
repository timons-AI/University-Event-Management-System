import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { UserRole } from "@prisma/client";

const EventsPage = async () => {
  const enable = false;
  if (!enable) {
    redirect("/dashboard");
  }
  const session = await auth();
  const userId = session?.user.id;

  if (!userId) {
    return redirect("/");
  }

  const users = await db.user.findMany({
    where: {
      role: {
        in: [UserRole.LEADER, UserRole.STUDENT],
      },
    },
    orderBy: {
      name: "desc",
    },
  });

  return (
    <div className="p-6">
      <DataTable columns={columns} data={users} />
    </div>
  );
};

export default EventsPage;
