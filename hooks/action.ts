"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { LoginCredType, SignupCredType } from "@/types/auth";

export async function login({ email, password }: LoginCredType) {
    const supabase = await createClient();

    const { error, data } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
        if (error.message.includes("Invalid login credentials")) {
            throw new Error("No account found for this email. Please sign up or check your credentials.");
        } else {
            throw new Error(error.message);
        }
    }

    if (data.user) {
        const { data: userInfo, error: userError } = await supabase
            .from("users")
            .select("*")
            .eq("auth_user_id", data.user.id)
            .single();

        if (userError) {
            console.log("fetch user from db err:", userError);
            throw new Error("Failed to fetch user data");
        }

        // Store user info in cookies
        (await cookies()).set("user", JSON.stringify(userInfo), {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7, // 7 days max age
        });

        return userInfo;
    }
}

export async function signup({ email, password }: SignupCredType) {
    const supabase = await createClient();

    const { error, data } = await supabase.auth.signUp({ email, password });

    if (data?.user) {
        const { error: userError } = await supabase.from("users").insert([
            {
                auth_user_id: data.user.id,
                email: data.user.email,
            },
        ]);

        if (userError) {
            console.log("User table insert error:", userError);
            throw new Error(userError.message);
        }
    }

    if (error) {
        throw new Error(error.message);
    }

    return data;
}

export async function getUserProfile() {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();

    if (!user || !user.data.user) redirect("/auth/login");

    const userCookie = (await cookies()).get("user")?.value;
    if (userCookie) {
        try {
            return JSON.parse(userCookie);
        } catch (error) {
            console.error("Error parsing user cookie:", error);
        }
    }

    // Fetch from DB if no valid cookie
    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("auth_user_id", user.data.user.id)
        .single();

    if (error) throw new Error("Failed to fetch profile");

    // Store in cookies
    (await cookies()).set("user", JSON.stringify(data), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7, // 7 days max age
    });

    return data;
}

export async function updateUserProfile(profileData: {
    fname: string;
    lname: string;
}) {
    const supabase = await createClient();
    const user = await supabase.auth.getUser();

    if (!user || !user.data.user) redirect("/auth/login");

    const { data: updatedUser, error } = await supabase
        .from("users")
        .update(profileData)
        .eq("auth_user_id", user.data.user.id)
        .select("*")
        .single();

    if (error) throw new Error("Failed to update profile");

    (await cookies()).set("user", JSON.stringify(updatedUser), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days max age
    });

    return updatedUser;
}
