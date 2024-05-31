import { InfoCard } from "@/app/(dashboard)/_components/info-card";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import {
  ArchiveIcon,
  CheckCircle,
  CirclePower,
  CircleUser,
  Clock,
  StarIcon,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BiHomeCircle } from "react-icons/bi";
import { FcDocument } from "react-icons/fc";

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

  const bookedEvent = await db.event.findMany({
    where: {
      bookings: {
        some: {
          userId: user.id,
        },
      },
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
        <Link href="/leader/report">
          <Button variant="outline" className="flex items-center m-4">
            <FcDocument className="mr-2" />
            View Report
          </Button>
        </Link>
      </div>
      {bookedEvent.length > 0 && (
        <>
          <div className=" border-t border-gray-200 pt-4 space-y-4"></div>
          <h2 className=" text-2xl font-semibold">Events you have booked </h2>
          {bookedEvent.map((event) => (
            <Link href={`/listing/${event.id}`} key={event.id}>
              <div className=" bg-purple-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-purple-500 max-w-64">
                <StarIcon className=" h-4 w-4" />
                <p>{event.name}</p>
              </div>
            </Link>
          ))}
        </>
      )}
    </div>
  );
};

export default LeaderPage;
