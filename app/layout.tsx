import type { Metadata } from "next"
import { Geist, Geist_Mono, Inter } from "next/font/google"
import "./globals.css"
import TanstackProvider from "@/context/TanstackProvider"

const inter = Inter({ subsets: ["latin"] })

export const viewport = {
  maximumScale: 1, // Disable auto-zoom on ios devices
}

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
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <TanstackProvider>{children}</TanstackProvider>
      </body>
    </html>
  )
}
