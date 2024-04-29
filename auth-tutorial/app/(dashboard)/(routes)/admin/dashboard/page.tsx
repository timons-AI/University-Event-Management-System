import { InfoCard } from "@/app/(dashboard)/_components/info-card";
import { CalendarCheck2, CheckCircle, Clock, User2Icon } from "lucide-react";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/dist/server/api-utils";

const Admin = async () => {
  const events = await db.event.findMany({
    where: {
      status: "PUBLISHED",
    },
  });

  const users = await db.user.findMany({
    where: {
      role: "LEADER",
    },
  });

  const totalEvents = await db.event.count();

  return (
    <div className=" p-6 space-y-4">
      <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={User2Icon}
          label="Number of Leaders"
          numberOfItems={users.length}
        />
        <InfoCard
          icon={CheckCircle}
          variant="default"
          label="Events Pending Review"
          numberOfItems={events.length}
        />
        <InfoCard
          icon={CalendarCheck2}
          variant="success"
          label="Total Events"
          numberOfItems={totalEvents}
        />
      </div>
    </div>
  );
};

export default Admin;
