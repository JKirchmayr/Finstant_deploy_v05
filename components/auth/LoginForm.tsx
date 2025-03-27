"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { LoginCredType } from "@/types/auth";
import { useLoginUser } from "@/hooks/useAuth";

// **Validation Schema**
const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<LoginCredType>({ resolver: zodResolver(loginSchema) });

    const { mutate: loginUser, isPending } = useLoginUser();

    const onSubmit = (data: LoginCredType) => {
        loginUser(data);
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Login</CardTitle>
                    <CardDescription>Empowering Companies and Startups to Raise Funds Efficiently.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="grid gap-6">
                            {/* Email Field */}
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" type="email" placeholder="m@example.com" {...register("email")} />
                                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                            </div>

                            {/* Password Field */}
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    <a href="#" className="ml-auto text-xs text-gray-400 underline-offset-4 hover:underline">
                                        Forgot your password?
                                    </a>
                                </div>
                                <Input id="password" type="password" placeholder="Password" {...register("password")} />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            </div>

                            {/* Submit Button */}
                            <Button type="submit" className="w-full" disabled={isPending || isSubmitting}>
                                {isPending || isSubmitting ? "Logging in..." : "Login"}
                            </Button>
                        </div>
                    </form>

                    {/* Register Link */}
                    <div className="text-center text-sm mt-4">
                        Don't have an account?{" "}
                        <Link href="/auth/register" className="underline underline-offset-4">
                            Register
                        </Link>
                    </div>
                </CardContent>
            </Card>

            {/* Terms and Privacy */}
            <div className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
                By continuing, you agree to our <Link href="#terms" className="underline">Terms of Service</Link> and{" "}
                <Link href="#privacy" className="underline">Privacy Policy</Link>.
            </div>
        </div>
    );
}
