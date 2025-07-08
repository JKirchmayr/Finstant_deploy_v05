"use client"
import React, { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useLoginUser } from "@/hooks/useAuth"

// **Validation Schema**
const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const { mutate: loginUser, isPending } = useLoginUser()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: zodResolver(loginSchema) })

  const [focus, setFocus] = useState({ email: false, password: false })

  const handleFocus = (field: string) => setFocus({ ...focus, [field]: true })
  const handleBlur = (field: string) => setFocus({ ...focus, [field]: false })

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    loginUser(data)
  }

  return (
    <div className="min-h-screen flex flex-col w-full">
      <div className="flex-1 flex flex-col justify-center items-center px-8 py-12 bg-white">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm bg-gray-100 bg-opacity-90 rounded-2xl p-8 animate-fade-in"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center tracking-wide">
            Login
          </h2>
          {/* Email Field */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1 pl-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 text-gray-900 bg-white"
              required
              placeholder="example@mail.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
          </div>
          {/* Password Field */}
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1 pl-1">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className="block w-full border border-gray-300 rounded-md px-3 py-2 pr-10 focus:outline-none focus:ring-1 focus:ring-gray-300 focus:border-gray-300 text-gray-900 bg-white"
                required
                placeholder="Password"
              />
              <button
                type="button"
                tabIndex={-1}
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 focus:outline-none"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <Eye className="h-5 w-5" /> : <EyeOff className="h-5 w-5" />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={isPending || isSubmitting}
            className="w-full py-2 rounded-md font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-colors duration-150 focus:outline-none disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {isPending || isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
