import { db } from "@/lib/db";
// import { toast } from "react-hot-toast";
import { bookEvent } from "@/actions/users";
import { auth } from "@/auth";
import { Booking } from "./_components/book-button";
import { currentUser } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import Link from "next/link";

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

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 p-4 bg-gradient-to-r bg-white pt-24 w-full h-full">
      {listings.map((listing) => (
        <Link href={`/listing/${listing.id}`} key={listing.id}>
          <div className="p-4 bg-white rounded-md border border-slate-400 w-full h-64">
            <h2 className="text-2xl font-semibold ">{listing.name}</h2>
            <p className="text-gray-500">{listing.description}</p>
            <p className="text-gray-500">Published by: {listing.user.name}</p>
            <p className="text-gray-500">Venue: {listing?.venue?.name}</p>
            <p className="text-gray-500">
              Date:{" "}
              {listing.date ? new Date(listing.date).toLocaleDateString() : ""}
            </p>
            {listing.price !== null && listing.price > 0 ? (
              <p className="text-gray-500">
                Price of entry: UGX, {listing.price.toLocaleString()}
              </p>
            ) : (
              <p className="text-gray-500">Event is free</p>
            )}
            <div className="flex justify-end"></div>

            {session?.role === "ADMIN" ? (
              // http://localhost:3000/admin/events/clxn8e0oi0003dzei5zwahusx
              <Link href={`/admin/events/${listing.id}`}>
                <Button>View</Button>
              </Link>
            ) : (
              <div>
                {listing.bookings.length > 0 ? (
                  <div>
                    <FormSuccess message="You are registered for this event " />
                    <p className="text-gray-500 text-xs">
                      Date Booked:{" "}
                      {new Date(
                        listing.bookings[0].createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>
                ) : (
                  <Booking listingId={listing.id} userId={session?.id} />
                )}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ListingPage;
