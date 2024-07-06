import * as z from "zod";

export const SettingsSchema = z.object({
  name: z.optional(z.string()),
});

export const CreateEventSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Minimum 4 characters required" })
    .regex(/^[a-zA-Z0-9]*$/, {
      message: "Only alphanumeric characters are allowed",
    }),
});

// export const LoginSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(1, { message: "Password is required" }),
// });

export const LoginSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .refine(
      (email) =>
        email.endsWith("@students.mak.ac.ug") ||
        email.endsWith("@cit.mak.ac.ug"),
      {
        message:
          "Email must be from the domain @students.mak.ac.ug or cit.mak.ac.ug",
      }
    ),
  password: z.string().min(1, { message: "Password is required" }),
});

// export const RegisterSchema = z.object({
//   email: z.string().email(),
//   password: z.string().min(6, { message: "Minimum 6 characters required" }),
//   name: z.string().min(1, { message: "Name is required" }),
// });
export const RegisterSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .refine((email) => email.endsWith("@students.mak.ac.ug"), {
      message: "Email must be from the domain @students.mak.ac.ug",
    }),
  password: z
    .string()
    .min(8, { message: "Minimum 8 characters required" })
    .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Must contain at least one digit" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Must contain at least one special character",
    }),
  name: z
    .string()
    .min(4, { message: "Minimum 4 characters required" })
    .regex(/^[a-zA-Z0-9]*$/, {
      message: "Only alphanumeric characters are allowed",
    }),
});
//

export const CitRegisterSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .refine((email) => email.endsWith("@cit.mak.ac.ug"), {
      message: "Email must be from the domain cit.mak.ac.ug",
    }),
  password: z
    .string()
    .min(8, { message: "Minimum 8 characters required" })
    .regex(/[A-Z]/, { message: "Must contain at least one uppercase letter" })
    .regex(/[a-z]/, { message: "Must contain at least one lowercase letter" })
    .regex(/[0-9]/, { message: "Must contain at least one digit" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Must contain at least one special character",
    }),
  name: z
    .string()
    .min(4, { message: "Minimum 4 characters required" })
    .regex(/^[a-zA-Z0-9]*$/, {
      message: "Only alphanumeric characters are allowed",
    }),
});

export const UpdateEventSchema = z.object({
  name: z
    .string()
    .min(4, { message: "Minimum 4 characters required" })
    .regex(/^[a-zA-Z0-9]*$/, {
      message: "Only alphanumeric characters are allowed",
    }),
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
