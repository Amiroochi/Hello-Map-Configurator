import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export type FormInputs = z.infer<typeof FormSchema>;

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const resolver = zodResolver(FormSchema);
