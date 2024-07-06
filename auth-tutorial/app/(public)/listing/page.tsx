import Link from "next/link";
import {
  CalendarIcon,
  CalendarRangeIcon,
  MapPinIcon,
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
import { Booking } from "./_components/book-button";
import { Alert, AlertDescription } from "@/components/ui/alert";

const ListingPage = async () => {
  const session = await currentUser();
  const listings = await db.event.findMany({
    where: {
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

  if (listings.length === 0) {
    return (
      <div className="container mx-auto mt-24 p-4">
        <Card>
          <CardHeader>
            <CardTitle>No Events Available</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              There are currently no events scheduled. Please check back later!
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-5 p-4">
      <h1 className="text-3xl font-bold m-4">Events</h1>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listings.map((listing) => (
          <Card key={listing.id} className="h-full flex flex-col">
            <CardHeader>
              <CardTitle>{listing.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
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
            <CardFooter className="flex justify-between items-center">
              <Link href={`/listing/${listing.id}`} passHref>
                <Button variant="secondary">View Details</Button>
              </Link>
              {session?.role === "ADMIN" ? (
                <Link href={`/admin/events/${listing.id}`} passHref>
                  <Button variant="secondary">Admin View</Button>
                </Link>
              ) : (
                <BookingStatus listing={listing} session={session} />
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

const BookingStatus = ({
  listing,
  session,
}: {
  listing: any;
  session: any;
}) => {
  if (listing.bookings.length > 0) {
    return (
      <Alert variant="default" className="m-2">
        <CalendarRangeIcon className="h-4 w-4 mr-2" />
        <AlertDescription>
          Registered on{" "}
          {new Date(listing.bookings[0].createdAt).toLocaleDateString()}
        </AlertDescription>
      </Alert>
    );
  }
  return <Booking listingId={listing.id} userId={session?.id} />;
};

export default ListingPage;
