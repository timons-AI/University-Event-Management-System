"use client";
import { bookEvent } from "@/actions/users";
// import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";

interface BookingProps {
  listingId: string;
  userId: string | null;
}
export const Booking = ({ listingId, userId }: BookingProps) => {
  //   const router = useRouter();
  const handleBooking = (listingId: string) => {
    console.log("Booking event with ID: ", listingId);
    if (!userId) {
      // Redirect to login page if user is not logged in
      //   router.push("/login");
      console.log("Please login to book an event.", userId);
      toast.error("Please login to book an event.");

      return;
    }

    try {
      // Perform booking logic here
      bookEvent(listingId);

      // Show success message
      toast.success("Event booked successfully!");

      // Update booking status
    } catch (error) {
      // Show error message
      toast.error("Failed to book event. Please try again later.");
    }
  };
  return (
    <div>
      <Button onClick={() => handleBooking(listingId)}>Book Now</Button>
    </div>
  );
};
