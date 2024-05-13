import { db } from "@/lib/db";
// import { toast } from "react-hot-toast";
import { bookEvent } from "@/actions/users";
import { auth } from "@/auth";
import { Booking } from "./_components/book-button";
import { currentUser } from "@/lib/auth";

const ListingPage = async () => {
  const session = await currentUser();
  const listings = await db.event.findMany({
    where: {
      status: "PUBLISHED",
    },
    include: {
      user: true,
      venue: true,
    },
  });

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 p-4 bg-gradient-to-r bg-white pt-24 w-full h-full">
      {listings.map((listing) => (
        <div
          key={listing.id}
          className="p-4 bg-white rounded-md border border-slate-400 w-full h-64"
        >
          <h2 className="text-2xl font-semibold ">{listing.name}</h2>
          <p className="text-gray-500">{listing.description}</p>
          <p className="text-gray-500">Published by: {listing.user.name}</p>
          <p className="text-gray-500">Venue: {listing?.venue?.name}</p>
          <p className="text-gray-500">
            Date: {new Date(listing.date).toLocaleDateString()}
          </p>
          {listing.price > 0 ? (
            <p className="text-gray-500">
              Price of entry: UGX. {listing.price}
            </p>
          ) : (
            <p className="text-gray-500">Event is free</p>
          )}
          <div className="flex justify-end">
            {listing.price > 0 ? (
              <Booking listingId={listing.id} userId={session?.id} />
            ) : (
              <Booking listingId={listing.id} userId={session?.id} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListingPage;
