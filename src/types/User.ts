import { z } from "zod";

export const UserSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "O nome é obrigatório."),
  email: z.string().email("Formato de email inválido."),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres."),
  role: z.enum(["user", "admin"], "O papel deve ser 'user' ou 'admin'."),
});

export type User = z.infer<typeof UserSchema>;