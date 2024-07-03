import { z } from "zod";

export const formSchema = {
  signUp: z
    .object({
      name: z.string().nonempty("First name is required"),
      secondName: z.string().nonempty("Second name is required"),
      email: z.string().email("Invalid email address"),
      password: z.string().min(6, "Password must be at least 6 characters"),
      passwordConfirm: z
        .string()
        .min(6, "Password must be at least 6 characters"),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "Passwords don't match",
      path: ["passwordConfirm"],
    }),

  signIn: z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    remember: z.boolean().optional(),
  }),
};

export type FormDataSignIn = z.infer<typeof formSchema.signIn>;
export type FormDataSignUp = z.infer<typeof formSchema.signUp>;
