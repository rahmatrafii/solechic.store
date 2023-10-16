import z from "zod";

export const loginSchema = z.object({
  email: z.string().email({ message: "Invalid Email Address" }),
  password: z.string().min(8, { message: "minimum 8 characters" }).max(100),
});

export const registerSchema = z.object({
  email: z.string().email({ message: "Invalid Email Address" }),
  password: z.string().min(8, { message: "minimum 8 characters" }).max(100),
  username: z.string().min(3, { message: "minimum 3 characters" }),
});
