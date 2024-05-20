import { InfoCard } from "@/app/(dashboard)/_components/info-card";
import {
  CalendarCheck2,
  CheckCircle,
  Clock,
  Globe,
  User2Icon,
} from "lucide-react";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { FormSuccess } from "@/components/form-success";

const Admin = async () => {
  const user = await currentUser();
  if (!user) {
    return redirect("/");
  }
  const events = await db.event.findMany({
    include: {
      bookings: true,
    },
  });

  const users = await db.user.findMany();

  const totalEvents = await db.event.count();

  return (
    <div className=" p-6 space-y-4">
      <FormSuccess message={"Welcome back, " + user.name + " !"} />
      <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={User2Icon}
          variant="emerald"
          label="Leaders"
          numberOfItems={
            users.filter((users) => !users.role || users.role === "LEADER")
              .length
          }
        />
        <InfoCard
          icon={User2Icon}
          variant="rose"
          label="Students"
          numberOfItems={
            users.filter((users) => !users.role || users.role === "STUDENT")
              .length
          }
        />
        <InfoCard
          icon={CheckCircle}
          variant="yellow"
          label="Events Pending Review"
          numberOfItems={
            events.filter(
              (event) => !event.status || event.status === "PENDING"
            ).length
          }
        />
        <InfoCard
          icon={Globe}
          variant="purple"
          label="Total Events"
          numberOfItems={totalEvents}
        />

        <InfoCard
          icon={Clock}
          variant="rose"
          label="Published Events"
          numberOfItems={
            events.filter(
              (event) => !event.status || event.status === "PUBLISHED"
            ).length
          }
        />
      </div>
    </div>
  );
};

export default Admin;
