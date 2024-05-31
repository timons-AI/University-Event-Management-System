import { Button } from "@/components/ui/button";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { Download } from "lucide-react";
import { redirect } from "next/navigation";
import Report from "./_components/report";

const AdminReport = async () => {
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

  const publishedEvents = events.filter(
    (event) => event.status === "PUBLISHED"
  );
  console.log("PUBLISHED EVENTS", publishedEvents);

  // all bookings from published events
  const bookings = publishedEvents.map((event) => event.bookings).flat();

  // these are events that are published and have bookings that are verified true
  const confirmedEvents = publishedEvents.find(
    (event) => event.bookings.length > 0
  );
  console.log("CONFIRMED EVENTS", confirmedEvents);

  const totalCash =
    bookings.reduce((acc, booking) => {
      const event = events.find((event) => event.id === booking.eventId);
      if (event && event.price !== null && booking) {
        return acc + event.price;
      }
      return acc;
    }, 0) || 0;

  const UnverifiedCash =
    bookings.reduce((acc, booking) => {
      const event = events.find((event) => event.id === booking.eventId);
      if (event && event.price !== null && !booking.verified) {
        return acc + event.price;
      }
      return acc;
    }, 0) || 0;

  const verifiedCash =
    bookings.reduce((acc, booking) => {
      const event = events.find((event) => event.id === booking.eventId);
      if (event && event.price !== null && booking.verified) {
        return acc + event.price;
      }
      return acc;
    }, 0) || 0;

  return (
    <>
      <Report
        user={user}
        users={users}
        events={events}
        confirmedEvents={confirmedEvents}
        totalCash={totalCash}
        verifiedCash={verifiedCash}
        UnverifiedCash={UnverifiedCash}
        Bookings={bookings}
      />
    </>
  );
};

export default AdminReport;

// for an admin report, we want to display the following information:
// - user information
// - statistics of users on the platform
// - statistics of events on the platform
// - statistics of revenue generated from events
