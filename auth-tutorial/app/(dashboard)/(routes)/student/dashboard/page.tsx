import { InfoCard } from "@/app/(dashboard)/_components/info-card";
import { FormSuccess } from "@/components/form-success";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { CheckCircledIcon } from "@radix-ui/react-icons";
import {
  ArchiveIcon,
  CheckCircle,
  CirclePower,
  CircleUser,
  Clock,
  StarIcon,
} from "lucide-react";
import { redirect } from "next/navigation";

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

  return (
    <div className=" p-6 space-y-4">
      <FormSuccess message={"Welcome back, " + user.name + " !"} />
      <div className=" grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={CheckCircle}
          variant="purple"
          label="Events Booked"
          numberOfItems={events.length}
        />
      </div>
      <div className=" border-t border-gray-200 pt-4 space-y-4"></div>
      <h2 className=" text-2xl font-semibold">Events </h2>
      {events.map((event) => (
        <div
          key={event.id}
          className=" bg-purple-500/15 p-3 rounded-md flex items-center gap-x-2 text-sm text-purple-500 max-w-64"
        >
          <StarIcon className=" h-4 w-4" />
          <p>{event.name}</p>
        </div>
      ))}
    </div>
  );
};

export default LeaderPage;
