"use server";
import * as z from "zod";

import { db } from "@/lib/db";
import { CreateEventSchema, UpdateEventSchema } from "@/schemas";
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
  // if (dbUser.role !== "LEADER") {
  //   return { error: "Unauthorized" };
  // }

  const event = await db.event.create({
    data: {
      name: values.name,
      userId: dbUser.id,
    },
  });

  return { data: event };
};

export const publishEvent = async (eventId: string) => {
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

  // if (event.userId !== dbUser.id) {
  //   return { error: "Unauthorized" };
  // }

  const updatedEvent = await db.event.update({
    where: {
      id: eventId,
    },
    data: {
      status: "PENDING",
    },
  });

  return { data: updatedEvent };
};

export const unpublishEvent = async (eventId: string) => {
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

  // if (event.userId !== dbUser.id) {
  //   return { error: "Unauthorized" };
  // }

  const updatedEvent = await db.event.update({
    where: {
      id: eventId,
    },
    data: {
      status: "DRAFT",
    },
  });

  return { data: updatedEvent };
};

export const archiveEvent = async (eventId: string) => {
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

  // if (event.userId !== dbUser.id) {
  //   return { error: "Unauthorized" };
  // }

  const updatedEvent = await db.event.update({
    where: {
      id: eventId,
    },
    data: {
      status: "ARCHIVED",
    },
  });

  return { data: updatedEvent };
};

export const updateEvent = async (
  values: z.infer<typeof UpdateEventSchema>,
  eventId: string
) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const dbUser = await getUserById(user.id);

  if (!dbUser) {
    return { error: "Unauthorized" };
  }
  console.log(values);

  const event = await db.event.findUnique({
    where: {
      id: eventId,
    },
  });

  if (!event) {
    return { error: "Event not found" };
  }

  if (event.userId !== dbUser.id) {
    return { error: "Unauthorized" };
  }

  const updatedEvent = await db.event.update({
    where: {
      id: eventId,
    },
    data: {
      ...values,
    },
  });

  return { data: updatedEvent };
};

export const updateBookingFeedback = async (
  feedback: string,
  bookingId: string
) => {
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

  const event = await db.event.findUnique({
    where: {
      id: booking.eventId,
    },
  });

  if (!event) {
    return { error: "Event not found" };
  }

  // if (event.userId !== dbUser.id) {
  //   return { error: "Unauthorized" };
  // }

  const updatedBooking = await db.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      feedback,
    },
  });

  return { data: updatedBooking };
};
