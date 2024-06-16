import { FormSuccess } from "@/components/form-success";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { Booking } from "../_components/book-button";
import { currentUser } from "@/lib/auth";
import { FeedbackForm } from "./_components/description-form";

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
  return (
    <div className=" mt-6 w-full h-full p-8">
      <h1 className="text-2xl font-semibold">{listing.name}</h1>
      <p className="text-gray-500">{listing.description}</p>
      <p className="text-gray-500">Published by: {listing.user.name}</p>
      <p className="text-gray-500">Venue: {listing?.venue?.name}</p>
      <p className="text-gray-500">
        Date: {listing.date ? new Date(listing.date).toLocaleDateString() : ""}
      </p>
      {listing.price !== null && listing.price > 0 ? (
        <p className="text-gray-500">
          Price of entry: UGX, {listing.price.toLocaleString()}
        </p>
      ) : (
        <p className="text-gray-500">Event is free</p>
      )}
      <div className="flex justify-end"></div>
      <div>
        {listing.bookings.length > 0 ? (
          <div>
            <FormSuccess message="You are registered for this listing " />
            <p className="text-gray-500 text-xs">
              Date Booked:{" "}
              {new Date(listing.bookings[0].createdAt).toLocaleDateString()}
            </p>
          </div>
        ) : (
          <Booking listingId={listing.id} userId={session?.id} />
        )}
      </div>
      {listing.bookings[0].verified ? (
        <div>
          <p
            className="text-gray-500 bg-green-100 p-2 rounded-md m-2 text-xs
            "
          >
            Your attendance has been confirmed
          </p>
        </div>
      ) : (
        <div>
          <p
            className="text-gray-500 bg-red-100 p-2 rounded-md m-2 text-xs
            "
          >
            Call The help line : 077 562 1957 to confirm your attendance
          </p>
        </div>
      )}

      {listing.bookings.length > 0 &&
        listing.bookings[0].verified &&
        ((listing.date && listing.date < new Date()) ||
          listing.status === "ARCHIVED") && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold">Feedback</h2>
            <FeedbackForm
              initialData={listing.bookings[0]}
              eventId={params.eventId}
            />
          </div>
        )}
    </div>
  );
};

export default EventDetail;
