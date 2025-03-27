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
import { useSignupUser } from "@/hooks/useAuth";

// **Validation Schema**
const signupSchema = z
    .object({
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirmPassword: z.string().min(6, "Password confirmation is required"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });

// **Component**
const SignupForm = ({ className, ...props }: React.ComponentPropsWithoutRef<"div">) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<{ email: string; password: string; confirmPassword: string }>({
        resolver: zodResolver(signupSchema),
    });

    const { mutate: signupUser, isPending } = useSignupUser();

    // **Submit Handler**
    const onSubmit = (data: { email: string; password: string }) => {
        signupUser({ email: data.email, password: data.password });
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl">Register</CardTitle>
                    <CardDescription>Join us and start raising funds efficiently.</CardDescription>
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
                                <Label htmlFor="password">Password</Label>
                                <Input id="password" type="password" placeholder="Password" {...register("password")} />
                                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                            </div>

                            {/* Confirm Password Field */}
                            <div className="grid gap-2">
                                <Label htmlFor="confirmPassword">Confirm Password</Label>
                                <Input id="confirmPassword" type="password" placeholder="Confirm Password" {...register("confirmPassword")} />
                                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                            </div>

                            {/* Submit Button */}
                            <Button type="submit" className="w-full" disabled={isPending || isSubmitting}>
                                {isPending || isSubmitting ? "Signing up..." : "Register"}
                            </Button>
                        </div>
                    </form>

                    {/* Login Link */}
                    <div className="text-center text-sm mt-4">
                        Already have an account?{" "}
                        <Link href="/auth/login" className="underline underline-offset-4">
                            Login
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
};

export default SignupForm;
