import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { getUserProfile, login, signup, updateUserProfile } from "./action"

// Types for authentication inputs
interface AuthCredentials {
  email: string
  password: string
}

interface ProfileData {
  fname: string
  lname: string
}

// Hook for signing up a user
export const useSignupUser = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async ({ email, password }: AuthCredentials) => signup({ email, password }),
    onSuccess: () => {
      toast.success("Account created successfully!")
      router.replace("/dashboard")
    },
    onError: (error: Error) => {
      console.error("Signup Error:", error.message)
      toast.error(error.message)
    },
  })
}

// Hook for logging in a user
export const useLoginUser = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: async ({ email, password }: AuthCredentials) => login({ email, password }),
    onSuccess: () => {
      toast.success("Logged in successfully!")
      router.replace("/companies")
    },
    onError: (error: Error) => {
      console.error("Login Error:", error.message)
      toast.error(error.message)
    },
  })
}

// Hook for fetching user profile
export const useUserProfile = () => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: getUserProfile,
    staleTime: 1000 * 60 * 10, // Cache data for 10 minutes
  })
}

// Hook for updating user profile
export const useUpdateUserProfile = () => {
  return useMutation({
    mutationFn: async (profileData: ProfileData) => updateUserProfile(profileData),
    onSuccess: () => {
      toast.success("Profile updated successfully!")
    },
    onError: (error: Error) => {
      console.error("Profile Update Error:", error.message)
      toast.error(error.message)
    },
  })
}
