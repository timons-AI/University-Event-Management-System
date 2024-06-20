import { InfoCard } from "@/app/(dashboard)/_components/info-card";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  ArchiveIcon,
  CheckCircle,
  CirclePower,
  CircleUser,
  Clock,
  Link2,
  StarIcon,
} from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { BiRightArrow } from "react-icons/bi";
import { FcDocument } from "react-icons/fc";

const LeaderPage = async () => {
  const user = await currentUser();
  if (!user) {
    return redirect("/");
  }
  const events = await db.event.findMany({
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

  const publishedEvents = events.filter(
    (event) =>
      event.status === "PUBLISHED" && event.date && event.date > new Date()
  );
  const ArchievedEvents = events.filter(
    (event) =>
      event.status === "ARCHIVED" || (event.date && event.date < new Date())
  );

  return (
    <div className=" p-6 space-y-4">
      <FormSuccess message={"Welcome back, " + user.name + " !"} />
      <Sheet>
        <SheetTrigger>
          <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoCard
              icon={CheckCircle}
              variant="purple"
              label="Events Booked"
              numberOfItems={publishedEvents.length}
            />
          </div>
        </SheetTrigger>
        <SheetContent className=" ">
          <SheetHeader>
            <SheetTitle>Events Booked</SheetTitle>
            <SheetDescription>
              These are the events you have booked
            </SheetDescription>
          </SheetHeader>
          <div className=" space-y-4">
            {publishedEvents.map((event) => (
              <Link href={`/listing/${event.id}`} key={event.id}>
                <div className=" flex w-full items-center gap-x-2 m-2 bg-purple-500/15 p-3 rounded-md text-sm text-purple-500 max-w-64">
                  <StarIcon className=" h-4 w-4" />
                  <p>{event.name}</p>
                  <Link2 className=" h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      <Link href="/student/report">
        <Button variant="outline" className="flex items-center m-4">
          <FcDocument className="mr-2" />
          View Report
        </Button>
      </Link>
      <div className=" border-t border-gray-200 pt-4 space-y-4"></div>
      <h2 className=" text-2xl font-semibold">Events you have booked </h2>

      {publishedEvents.map((event) => (
        <Link href={`/listing/${event.id}`} key={event.id}>
          <div className=" flex w-full items-center gap-x-2 m-2 bg-purple-500/15 p-3 rounded-md text-sm text-purple-500 max-w-64">
            <StarIcon className=" h-4 w-4" />
            <p>{event.name}</p>
            <Link2 className=" h-4 w-4" />
          </div>
        </Link>
      ))}

      <div className=" border-t border-gray-200 pt-4 space-y-4"></div>
      <h2 className=" text-2xl font-semibold">
        Events you have booked in the past{" "}
      </h2>
      <div className=" space-y-4 flex">
        {ArchievedEvents.map((event) => (
          <Link href={`/listing/${event.id}`} key={event.id}>
            <div className=" bg-purple-500/15 p-3 m-2 rounded-md flex items-center gap-x-2 text-sm text-purple-500 max-w-64">
              <StarIcon className=" h-4 w-4" />
              <p>{event.name}</p>
              <Link2 className=" h-4 w-4" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default LeaderPage;
