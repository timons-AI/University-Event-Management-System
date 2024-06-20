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
import Print from "./_components/print-pdf";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FcDocument } from "react-icons/fc";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

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
        <Sheet>
          <SheetTrigger>
            <InfoCard
              icon={User2Icon}
              variant="emerald"
              label="Leaders"
              numberOfItems={
                users.filter((users) => !users.role || users.role === "LEADER")
                  .length
              }
            />
          </SheetTrigger>
          <SheetContent className=" ">
            <SheetHeader>
              <SheetTitle>Events Booked</SheetTitle>
              <SheetDescription>
                These are the events you have booked
              </SheetDescription>
            </SheetHeader>
            <div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users
                    .filter((user) => user.role === "LEADER")
                    .map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {user.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {user.email}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </SheetContent>
        </Sheet>
        <Sheet>
          <SheetTrigger>
            <InfoCard
              icon={Globe}
              variant="purple"
              label="Total Events"
              numberOfItems={totalEvents}
            />
          </SheetTrigger>
          <SheetContent className=" ">
            <SheetHeader>
              <SheetTitle>Events Booked</SheetTitle>
              <SheetDescription>
                These are the events you have booked
              </SheetDescription>
            </SheetHeader>
            <div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {events.map((event) => (
                    <tr key={event.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {event.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {event.date?.toString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {event.status || "PENDING"}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </SheetContent>
        </Sheet>
        <Sheet>
          <SheetTrigger>
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
          </SheetTrigger>
          <SheetContent className=" ">
            <SheetHeader>
              <SheetTitle>Published Events</SheetTitle>
              <SheetDescription>
                Events that are published and ready to be booked
              </SheetDescription>
            </SheetHeader>
            <div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {events
                    .filter(
                      (event) =>
                        event.status === "PUBLISHED" &&
                        event.date &&
                        event.date > new Date()
                    )
                    .map((event) => (
                      <tr key={event.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {event.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {event.date?.toString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {event.status || "PENDING"}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </SheetContent>
        </Sheet>

        <Sheet>
          <SheetTrigger>
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
          </SheetTrigger>
          <SheetContent className=" ">
            <SheetHeader>
              <SheetTitle>Events Pending Review</SheetTitle>
              <SheetDescription>
                These are the events that are pending review
              </SheetDescription>
            </SheetHeader>
            <div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {events
                    .filter(
                      (event) => !event.status || event.status === "PENDING"
                    )
                    .map((event) => (
                      <tr key={event.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {event.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {event.date?.toString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {event.status || "PENDING"}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </SheetContent>
        </Sheet>
        <Sheet>
          <SheetTrigger>
            <InfoCard
              icon={User2Icon}
              variant="rose"
              label="Students"
              numberOfItems={
                users.filter((users) => !users.role || users.role === "STUDENT")
                  .length
              }
            />
          </SheetTrigger>
          <SheetContent className=" ">
            <SheetHeader>
              <SheetTitle>Students</SheetTitle>
              <SheetDescription>
                These are the students in the system
              </SheetDescription>
            </SheetHeader>
            <div>
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Email
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users
                    .filter((user) => user.role === "STUDENT")
                    .map((user) => (
                      <tr key={user.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {user.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {user.email}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </SheetContent>
        </Sheet>
      </div>
      {/* <Print /> */}
      <Link href="/admin/report">
        <Button variant="outline" className="flex items-center m-4">
          <FcDocument className="mr-2" />
          View Report
        </Button>
      </Link>
    </div>
  );
};

export default Admin;
