"use server";

import { getUserById } from "@/data/user";
import { currentRole, currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";

export const admin = async () => {
  const role = await currentRole();

  if (role === UserRole.ADMIN) {
    return { success: "Allowed!" };
  }

  return { error: "Forbidden!" };
};

export const adminPublishEvent = async (eventId: string) => {
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
      status: "PUBLISHED",
    },
  });

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
