"use client";
import { Button } from "@/components/ui/button";
import { Booking, Event, User } from "@prisma/client";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import { Download } from "lucide-react";

interface ReportProps {
  user: any;
  users: User[];
  events: Event[];
  confirmedEvents: Event | undefined;
  totalCash: number;
  Bookings: Event[];
  verifiedCash: number;
  UnverifiedCash: number;
}
const Report = ({
  user,
  users,
  events,
  confirmedEvents,
  verifiedCash,
  UnverifiedCash,
  totalCash,
  Bookings,
}: ReportProps) => {
  const componentRef = useRef<HTMLElement | null>(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current!,
  });

  return (
    <div
      className=" p-6 space-y-4 text-sm "
      ref={componentRef as React.RefObject<HTMLDivElement>}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Report</h1>
        <Button variant="outline" onClick={handlePrint}>
          Print Report
          <Download size={16} className="ml-2" />
        </Button>
      </div>
      <h2 className="text-xl font-bold">User Information</h2>
      <table className="border border-slate-400 rounded-md w-3/4">
        <tbody>
          <tr>
            <td className="border border-slate-400 p-2 font-bold bg-gray-200">
              Title
            </td>
            <td className="border border-slate-400 p-2 font-bold bg-gray-200">
              Value
            </td>
          </tr>

          <tr>
            <td className="border border-slate-400 p-2">Date</td>
            <td className="border border-slate-400 p-2">
              {new Date().toDateString()}
            </td>
          </tr>
          <tr>
            <td className="border border-slate-400 p-2">Name</td>
            <td className="border border-slate-400 p-2">{user.name}</td>
          </tr>
          <tr>
            <td className="border border-slate-400 p-2">ID</td>
            <td className="border border-slate-400 p-2">{user.id}</td>
          </tr>
          <tr>
            <td className="border border-slate-400 p-2">Email</td>
            <td className="border border-slate-400 p-2">{user.email}</td>
          </tr>
          <tr>
            <td className="border border-slate-400 p-2">Role</td>
            <td className="border border-slate-400 p-2">{user.role}</td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-xl font-bold mt-4">User Statistics</h2>
      <table className="border border-slate-400 rounded-md w-3/4">
        <tbody>
          <tr>
            <td className="border border-slate-400 p-2 font-bold bg-gray-200">
              Title
            </td>
            <td className="border border-slate-400 p-2 font-bold bg-gray-200">
              Value
            </td>
          </tr>

          <tr>
            <td className="border border-slate-400 p-2">Total Users</td>
            <td className="border border-slate-400 p-2">{users.length}</td>
          </tr>
          <tr>
            <td className="border border-slate-400 p-2">Leaders</td>
            <td className="border border-slate-400 p-2">
              {
                users.filter((users) => !users.role || users.role === "LEADER")
                  .length
              }
            </td>
          </tr>
          <tr>
            <td className="border border-slate-400 p-2">Students</td>
            <td className="border border-slate-400 p-2">
              {
                users.filter((users) => !users.role || users.role === "STUDENT")
                  .length
              }
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-xl font-bold mt-4">Event Statistics</h2>
      <table className="border border-slate-400 rounded-md w-3/4">
        <tbody>
          <tr>
            <td className="border border-slate-400 p-2 font-bold bg-gray-200">
              Title
            </td>
            <td className="border border-slate-400 p-2 font-bold bg-gray-200">
              Value
            </td>
          </tr>

          <tr>
            <td className="border border-slate-400 p-2">Total Events</td>
            <td className="border border-slate-400 p-2">{events.length}</td>
          </tr>
          <tr>
            <td className="border border-slate-400 p-2">
              Events Pending Review
            </td>
            <td className="border border-slate-400 p-2">
              {
                events.filter(
                  (event) => !event.status || event.status === "PENDING"
                ).length
              }
            </td>
          </tr>
          <tr>
            <td className="border border-slate-400 p-2">Published Events</td>
            <td className="border border-slate-400 p-2">
              {
                events.filter(
                  (event) => !event.status || event.status === "PUBLISHED"
                ).length
              }
            </td>
          </tr>
          <tr>
            <td className="border border-slate-400 p-2">Archived Events</td>
            <td className="border border-slate-400 p-2">
              {
                events.filter(
                  (event) => !event.status || event.status === "ARCHIVED"
                ).length
              }
            </td>
          </tr>
        </tbody>
      </table>

      <h2 className="text-xl font-bold mt-4">Revenue Statistics</h2>
      <table className="border border-slate-400 rounded-md w-3/4">
        <tbody>
          <tr>
            <td className="border border-slate-400 p-2 font-bold bg-gray-200">
              Title
            </td>
            <td className="border border-slate-400 p-2 font-bold bg-gray-200">
              Value
            </td>
          </tr>
          <tr>
            <td className="border border-slate-400 p-2">Total Bookings</td>
            <td className="border border-slate-400 p-2">{Bookings.length}</td>
          </tr>
          <tr>
            <td className="border border-slate-400 p-2">Pending Bookings</td>
            <td className="border border-slate-400 p-2">
              {Bookings.filter((booking) => !booking.verified).length}
            </td>
          </tr>
          <tr>
            <td className="border border-slate-400 p-2">Confirmed Bookings</td>
            <td className="border border-slate-400 p-2">
              {Bookings.filter((booking) => booking.verified).length}
            </td>
          </tr>
        </tbody>
      </table>

      <table className="border border-slate-400 rounded-md w-3/4">
        <tbody>
          <tr>
            <td className="border border-slate-400 p-2 font-bold bg-gray-200">
              Title
            </td>
            <td className="border border-slate-400 p-2 font-bold bg-gray-200">
              Value
            </td>
          </tr>
          <tr>
            <td className="border border-slate-400 p-2">Expected Revenue</td>
            <td className="border border-slate-400 p-2">
              {totalCash
                ? totalCash.toLocaleString("en-US", {
                    style: "currency",
                    currency: "UGX",
                  })
                : 0}
            </td>
          </tr>

          <tr>
            <td className="border border-slate-400 p-2">Unconfirmed Revenue</td>
            <td className="border border-slate-400 p-2">
              {UnverifiedCash
                ? UnverifiedCash.toLocaleString("en-US", {
                    style: "currency",
                    currency: "UGX",
                  })
                : 0}
            </td>
          </tr>
          <tr>
            <td className="border border-slate-400 p-2">Confirmed Revenue</td>
            <td className="border border-slate-400 p-2">
              {verifiedCash
                ? verifiedCash.toLocaleString("en-US", {
                    style: "currency",
                    currency: "UGX",
                  })
                : 0}
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        This report was generated on {new Date().toDateString()} by {user.name}
      </p>
    </div>
  );
};

export default Report;

// for an admin report, we want to display the following information:
// - user information
// - statistics of users on the platform
// - statistics of events on the platform
// - statistics of revenue generated from events
