import { InfoCard } from "@/app/(dashboard)/_components/info-card";
import { FormSuccess } from "@/components/form-success";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  ArchiveIcon,
  CheckCircle,
  CirclePower,
  CircleUser,
  Clock,
} from "lucide-react";
import { redirect } from "next/navigation";
import { BiHomeCircle } from "react-icons/bi";

const LeaderPage = async () => {
  const user = await currentUser();
  if (!user) {
    return redirect("/");
  }
  const events = await db.event.findMany({
    where: {
      userId: user.id,
    },
    include: {
      bookings: true,
    },
  });

  return (
    <div className=" p-6 space-y-4">
      <FormSuccess message={"Welcome back, " + user.name + " !"} />
      <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={ArchiveIcon}
          label="Drafts"
          numberOfItems={
            events.filter((event) => !event.status || event.status === "DRAFT")
              .length
          }
        />
        <InfoCard
          icon={CheckCircle}
          variant="yellow"
          label="Events Awaiting Approval"
          numberOfItems={
            events.filter(
              (event) => !event.status || event.status === "PENDING"
            ).length
          }
        />
        <InfoCard
          icon={CircleUser}
          variant="rose"
          label="Attendees Registered"
          numberOfItems={events.reduce(
            (acc, event) => acc + event.bookings.length,
            0
          )}
        />
        <InfoCard
          icon={CheckCircle}
          variant="purple"
          label="Approved Events"
          numberOfItems={
            events.filter(
              (event) => !event.status || event.status === "PUBLISHED"
            ).length
          }
        />
        <InfoCard
          icon={CirclePower}
          variant="success"
          label="Rejected Events"
          numberOfItems={
            events.filter((event) => event.status === "REJECTED").length
          }
        />
        <InfoCard
          icon={BiHomeCircle}
          variant="rose"
          label="Total Events"
          numberOfItems={events.length}
        />
      </div>
    </div>
  );
};

export default LeaderPage;
