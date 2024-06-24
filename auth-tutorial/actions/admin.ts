"use server";

import { getUserById } from "@/data/user";
import { currentRole, currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { addMonths, subMonths } from "date-fns";

export const admin = async () => {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return { success: "Allowed!" };
  }

  return { error: "Forbidden!" };
};

export const adminPublishEvent = async (eventId: string) => {
  console.log("eventId", eventId);
  const role = await currentRole();

  if (role !== UserRole.ADMIN) {
    return { success: "Allowed!" };
  }

  const event = await db.event.findUnique({
    where: {
      id: eventId,
    },
  });

  if (!event) {
    return { error: "Event not found" };
  }
  console.log("event", event);

  const updatedEvent = await db.event.update({
    where: {
      id: eventId,
    },
    data: {
      status: "PUBLISHED",
    },
  });
  console.log("updatedEvent", updatedEvent);

  return { data: updatedEvent };
};

export const unpublishEvent = async (eventId: string) => {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return { success: "Allowed!" };
  }

  const event = await db.event.findUnique({
    where: {
      id: eventId,
    },
  });

  if (!event) {
    return { error: "Event not found" };
  }

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
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return { success: "Allowed!" };
  }

  const event = await db.event.findUnique({
    where: {
      id: eventId,
    },
  });

  if (!event) {
    return { error: "Event not found" };
  }

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

export const getEventsData = async () => {
  const now = new Date();
  const threeMonthsAgo = subMonths(now, 3);
  const sixMonthsFuture = addMonths(now, 6);

  const events = await db.event.findMany({
    where: {
      date: {
        gte: threeMonthsAgo,
        lte: sixMonthsFuture,
      },
    },
    select: {
      date: true,
      status: true,
    },
  });

  console.log("events:  : ", events);

  return events;
};
