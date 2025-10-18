"use client";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema, LoginType } from "../../../types/Auth.types";
import UserRole from "@/enum/UserRole.enum";

export function LoginPage() {
  const router = useRouter();

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
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <div className={cn("flex flex-col gap-6")}>
          <Card className="overflow-hidden p-0">
            <CardContent className="grid p-0 md:grid-cols-2">
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8">
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col items-center text-center">
                    <h1 className="text-2xl font-bold">Gestão de Horas</h1>
                    <p className="text-muted-foreground text-balance">
                      Controle inteligente do tempo trabalhado.
                    </p>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="usuário@gmail.com"
                      {...register("email")}
                    />
                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}

                  </div>
                  <div className="grid gap-3">
                    <div className="flex items-center">
                      <Label htmlFor="password">Senha</Label>
                    </div>
                    <Input
                      id="password"
                      type="password"
                      placeholder="********"
                      {...register("password")}
                    />
                    {errors.password && <span className="text-red-500">{errors.password.message}</span>}

                  </div>
                  <Button type="submit" className="w-full">
                    Login
                  </Button>
                </div>
              </form>
              <div className="bg-muted relative hidden md:block">
                <Image
                  height={350}
                  width={350}
                  src="/login.png"
                  alt="Image"
                  className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
                />
              </div>
            </CardContent>
          </Card>
          <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
            Ao clicar em continuar, você concorda com nossos <a href="#">Termos de Serviço</a>{" "}
            e <a href="#">Política de Privacidade</a>.
          </div>
        </div>
      </div>
    </div>
  )
}


