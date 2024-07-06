import { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  BoxIcon,
  CalendarIcon,
  MapPinIcon,
  TicketCheck,
  TicketIcon,
  UserIcon,
} from "lucide-react";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Booking } from "../_components/book-button";
import { FeedbackForm } from "./_components/description-form";
import QRCodeComponent from "./_components/QR-code";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { PiWarning } from "react-icons/pi";

export const metadata: Metadata = {
  title: "Event Details",
  description: "View and interact with event details",
};

const EventDetail = async ({ params }: { params: { eventId: string } }) => {
  const session = await currentUser();

  const listing = await db.event.findUnique({
    where: {
      id: params.eventId,
      status: "PUBLISHED",
    },
    include: {
      user: true,
      venue: true,
      bookings: {
        where: {
          userId: session?.id,
        },
      },
    },
  });

  if (!listing) {
    return redirect("/");
  }

  const QRCodeInfo = JSON.stringify({
    userId: session?.id,
    userName: session?.name,
    eventName: listing.name,
    eventDate: listing.date,
    dateBooked: listing.bookings[0]?.createdAt,
    venue: listing.venue?.name,
    eventId: listing.id,
  });

  const isEventPassed = listing.date && new Date(listing.date) < new Date();
  const isEventArchived = listing.status === "ARCHIVED";
  const canProvideFeedback = isEventPassed || isEventArchived;

  return (
    <div className="container mx-auto mt-6 p-4">
      <Card>
        <CardHeader>
          <CardTitle>{listing.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 mb-4">{listing.description}</p>
          <div className="space-y-2">
            <div className="flex items-center">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Published by: {listing.user.name}</span>
            </div>
            <div className="flex items-center">
              <MapPinIcon className="mr-2 h-4 w-4" />
              <span>Venue: {listing?.venue?.name}</span>
            </div>
            <div className="flex items-center">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>
                Date:{" "}
                {listing.date
                  ? new Date(listing.date).toLocaleDateString()
                  : "TBA"}
              </span>
            </div>
            <div className="flex items-center">
              <TicketIcon className="mr-2 h-4 w-4" />
              <span>
                {listing.price !== null && listing.price > 0
                  ? `Price: UGX ${listing.price.toLocaleString()}`
                  : "Event is free"}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          {session?.role === "ADMIN" ? (
            <Link href={`/admin/events/${listing.id}`}>
              <Button>View in Admin Panel</Button>
            </Link>
          ) : (
            <EventActions
              listing={listing}
              session={session}
              QRCodeInfo={QRCodeInfo}
              canProvideFeedback={canProvideFeedback}
            />
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

const EventActions = ({
  listing,
  session,
  QRCodeInfo,
  canProvideFeedback,
}: {
  listing: any;
  session: any;
  QRCodeInfo: string;
  canProvideFeedback: boolean;
}) => {
  const isBooked = listing.bookings.length > 0;
  const isVerified = isBooked && listing.bookings[0].verified;

  return (
    <div className="w-full space-y-4">
      {!isBooked && <Booking listingId={listing.id} userId={session?.id} />}

      {isBooked && (
        <Alert variant="default">
          <BoxIcon className="mr-2 h-4 w-4" />
          <AlertTitle>Registration Set</AlertTitle>
          <AlertDescription>
            You are registered for this event. Date Booked:{" "}
            {new Date(listing.bookings[0].createdAt).toLocaleDateString()}
          </AlertDescription>
        </Alert>
      )}

      {isBooked && !isVerified && (
        <Alert variant="destructive">
          <PiWarning className="mr-2 h-4 w-4" />
          <AlertTitle>Attendance Confirmation Required</AlertTitle>
          <AlertDescription>
            - Call the helpline: 077 562 1957 to confirm your attendance
            <br />
            - After confirming, you'll receive a QR code to scan at the event
            <br />- You'll be able to provide feedback after the event
          </AlertDescription>
        </Alert>
      )}

      {isVerified && (
        <>
          <Alert variant="default">
            <TicketCheck className="mr-2 h-4 w-4" />
            <AlertTitle>Attendance Confirmed</AlertTitle>
            <AlertDescription>
              Your attendance has been confirmed
            </AlertDescription>
          </Alert>
          <QRCodeComponent value={QRCodeInfo} />
        </>
      )}

      {isBooked && isVerified && canProvideFeedback && (
        <Card>
          <CardHeader>
            <CardTitle>Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <FeedbackForm
              initialData={listing.bookings[0]}
              eventId={listing.id}
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EventDetail;
