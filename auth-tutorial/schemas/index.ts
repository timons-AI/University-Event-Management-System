import * as z from "zod";

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
});

export const CreateEventSchema = z.object({
  name: z.string().min(4, { message: "Minimum 4 characters required" }),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, { message: "Password is required" }),
});

export const RegisterSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, { message: "Minimum 6 characters required" }),
  name: z.string().min(1, { message: "Name is required" }),
});
//
export const UpdateEventSchema = z.object({
  name: z.optional(
    z.string().min(4, { message: "Minimum 4 characters required" })
  ),
  description: z.optional(
    z.string().min(1, { message: "Description is required" })
  ),
  price: z.optional(z.number().min(0, { message: "Price must be a number" })),
  date: z.optional(z.string().min(1)),
  venueId: z.optional(z.string().min(1)),
});

export const UpdateUserSchema = z.object({
  role: z.optional(z.string().min(1)),
});
