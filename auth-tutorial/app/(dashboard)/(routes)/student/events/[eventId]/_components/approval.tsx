"use client";

import { revokeBooking, verifyBooking } from "@/actions/users";
import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { Booking, User } from "@prisma/client";
import { CheckCircle2, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface ApprovalProps {
  booking: Booking & { user: User };
  eventId: string;
}

export const Approval = ({ eventId, booking }: ApprovalProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const verify = async () => {
    try {
      setIsLoading(true);
      // await axios.post(`/api/booking/verify/${booking.id}`);
      verifyBooking(booking.id);
      toast.success("Booking verified");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const revoke = async () => {
    try {
      setIsLoading(true);
      // await axios.post(`/api/booking/revoke/${booking.id}`);
      revokeBooking(booking.id);
      toast.success("Booking revoked");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" flex items-center gap-x-2">
      <div
        key={booking.id}
        className="flex gap-2 w-full text-slate-700 bg-slate-100 border rounded-md p-2 items-center justify-between"
      >
        <div className=" flex-col">
          {booking.user.email}
          <p>
            <span className="text-slate-700 text-xs">
              Booked on: {booking.createdAt.toLocaleString()}
            </span>
          </p>
          {booking.feedback ? (
            <span className="text-sm bg-red-200 p-1 rounded-sm text-slate-700">
              {booking.feedback}
            </span>
          ) : (
            <span className="text-sm text-slate-700">No feedback given</span>
          )}
        </div>
        {booking.verified ? (
          <Button
            onClick={revoke}
            disabled={isLoading}
            className=" bg-red-400 flex items-center gap-2"
          >
            Revoke
            <Trash className=" h-4 w-4" />
          </Button>
        ) : (
          <Button
            onClick={verify}
            disabled={isLoading}
            className=" bg-green-400 flex items-center gap-2"
          >
            <CheckCircle2 className=" h-4 w-4" />
            Verify
          </Button>
        )}
      </div>
    </div>
  );
};
