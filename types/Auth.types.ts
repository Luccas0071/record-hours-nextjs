import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(1, "A senha é obrigatória."),
});

export type LoginType = z.infer<typeof LoginSchema>;