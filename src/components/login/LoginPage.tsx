"use client";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginType } from "../../types/Auth.types";
import UserRole from "@/enum/UserRole.enum";
import { Clock } from "lucide-react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "../ui/alert";
import { userStore } from "@/store/userStore";

export function LoginPage() {
  const router = useRouter();
  const setUser = userStore((state) => state.setUser);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginType>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = async (formData: LoginType) => {
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Erro ao realizar login");
      }

      const data = await response.json();

      setUser({
        id: data.sub,
        name: data.name, 
        email: data.email, 
        role: data.role 
      });

      if (data.role === UserRole.ADMINISTRATOR) {
        await router.replace("/administrator/dashboard");
      } else if (data.role === UserRole.USER) {
        await router.replace("/collaborator/dashboard");
      }
    } catch (error) {
      console.error(error);
      window.alert("Erro ao realizar login!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center mb-2">
            <div className="bg-primary text-primary-foreground p-3 rounded-lg">
              <Clock className="h-8 w-8" />
            </div>
          </div>
          <CardTitle className="text-2xl">Sistema de Registro de Horas</CardTitle>
          <CardDescription>Faça login para acessar o sistema</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Digite seu email"
                {...register("email")}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Senha</Label>
              <Input
                id="password"
                type="password"
                placeholder="Digite sua senha"
                {...register("password")}
                required
              />
            </div>

            {errors.email && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.email.message}</AlertDescription>
              </Alert>
            )}
            {errors.password && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{errors.password.message}</AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" size="lg">
              Entrar
            </Button>

            <div className="text-xs text-muted-foreground text-center space-y-1 pt-2">
              <p className="font-medium">Credenciais de demonstração:</p>
              <p>Admin: admin / admin123</p>
              <p>Funcionário: funcionario / func123</p>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


