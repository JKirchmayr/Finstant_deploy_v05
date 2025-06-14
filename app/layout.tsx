import type { Metadata } from "next"
import { Geist, Geist_Mono, Inter } from "next/font/google"
import "./globals.css"
import TanstackProvider from "@/context/TanstackProvider"
import Providers from "@/context/Provider"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"] })

export const viewport = {
  maximumScale: 1, // Disable auto-zoom on ios devices
}

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "PmRadar - Copilot",
  description: "-",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          <TanstackProvider>{children}</TanstackProvider>
        </Providers>
        <Toaster richColors />
      </body>
    </html>
  )
}
