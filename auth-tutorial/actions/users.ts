"use server";
import * as z from "zod";

import { db } from "@/lib/db";
import {
  CreateEventSchema,
  UpdateEventSchema,
  UpdateUserSchema,
} from "@/schemas";
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";

export const createEvent = async (
  values: z.infer<typeof CreateEventSchema>
) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }
  // role check
  if (dbUser.role !== "LEADER") {
    return { error: "Unauthorized" };
  }

  const event = await db.event.create({
    data: {
      name: values.name,
      userId: dbUser.id,
    },
  });

  return { data: event };
};
export const bookEvent = async (eventId: string) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  const event = await db.event.findUnique({
    where: {
      id: eventId,
    },
  });

  if (!event) {
    return { error: "Event not found" };
  }

  const existingBooking = await db.booking.findFirst({
    where: {
      eventId: event.id,
      userId: dbUser.id,
    },
  });

  if (existingBooking) {
    return { error: "Already booked this event" };
  }

  const booking = await db.booking.create({
    data: {
      eventId: event.id,
      userId: dbUser.id,
    },
  });

  return { data: booking };
};

export const updateUser = async (
  values: z.infer<typeof UpdateUserSchema>,
  userId: string
) => {
  console.log("UPDATED USER VALUES **************************", values);
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const role = user.role;
  if (role !== "ADMIN") {
    return { error: "Unauthorized" };
  }

  const user_to_change = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user_to_change) {
    return { error: "User not found" };
  }

  const updatedUser = await db.user.update({
    where: {
      id: userId,
    },
    data: {
      ...values,
    },
  });
  console.log("UPDATED USER **************************", updatedUser);

  return { data: updatedUser };
};

export const bookingAction = async (userId: string, eventId: string) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  const event = await db.event.findUnique({
    where: {
      id: eventId,
    },
  });

  if (!event) {
    return { error: "Event not found" };
  }

  const existingBooking = await db.booking.findFirst({
    where: {
      eventId: event.id,
      userId: dbUser.id,
    },
  });

  if (existingBooking) {
    return { error: "Already booked this event" };
  }

  const booking = await db.booking.create({
    data: {
      eventId: event.id,
      userId: dbUser.id,
    },
  });

  return { data: booking };
};

export const verifyBooking = async (bookingId: string) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  const booking = await db.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    return { error: "Booking not found" };
  }

  const updatedBooking = await db.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      verified: true,
    },
  });

  return { data: updatedBooking };
};

export const revokeBooking = async (bookingId: string) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }

  const booking = await db.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    return { error: "Booking not found" };
  }

  const updatedBooking = await db.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      verified: false,
    },
  });

  return { data: updatedBooking };
};
