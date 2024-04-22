"use server";
import * as z from "zod";

import { db } from "@/lib/db";
import { CreateEventSchema } from "@/schemas";
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
