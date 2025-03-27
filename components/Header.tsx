"use client";
import React from "react";
import { Building2, DollarSign, SlidersHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useTabStore } from "@/store/useInvestorStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { createClient } from "@/utils/supabase/client";
import { toast } from "sonner";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import MyListDropdown from "./filter/MyListModal";
import Link from "next/link";


const NavBar = () => {
  const path = usePathname();
  const { activeTab, setActiveTab } = useTabStore();
  const supabase = createClient();
  const router = useRouter();

  async function handleLogout() {
    try {
      await supabase.auth.signOut();
      router.push("/auth/login");
      toast.success("Logged out successfully!");
    } catch (error) {
      toast.error("Failed to log out. Please try again.");
    }
  }

  return (
    <header className="px-4 h-full bg-white border-b border-gray-300 flex items-center justify-between md:gap-4">
      {/* Logo */}
      <nav className="h-full flex items-center">
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="Logo"
            width={120}
            height={20}
            className="w-24 md:w-36"
          />
        </Link>
      </nav>

      {/* Desktop Navigation */}
      <div className="hidden md:flex flex-1 items-center gap-3">
        <p className="text-xs text-gray-600">Search for:</p>
        <div className="flex items-center gap-2">
          <Link
            href="/investors"
            className={cn(
              `inline-flex text-xs bg-white border border-gray-300 px-3 py-1 items-center justify-center rounded-sm text-gray-500 gap-2 transition`,
              {
                "bg-[#3a80f3] text-white border-[#3a80f3]":
                  path === "/investors",
              },
            )}
          >
            <DollarSign size={14} /> Investors
          </Link>

          <Link
            href={"/companies"}
            className={cn(
              `inline-flex text-xs bg-white border border-gray-300 px-3 py-1 items-center justify-center rounded-sm text-gray-500 gap-2 transition`,
              {
                "bg-[#3a80f3] text-white border-[#3a80f3]":
                  path === "/companies",
              },
            )}
          >
            <Building2 size={15} /> Companies
          </Link>
        </div>
      </div>

      {/* Profile + Mobile Menu */}
      <div className="flex items-center gap-3">
        {/* <Link href="/my-list" className="hidden md:block text-xs text-gray-500 font-medium">
          My List
        </Link> */}
        <MyListDropdown />

        {/* Profile Dropdown */}
        <div className="flex items-center gap-3">
        <span className="w-7 h-7 border border-gray-400 rounded-full bg-gray-300 text-gray-500 overflow-hidden cursor-pointer">
              <Image
                src="https://placehold.co/600x400/png"
                alt="User Avatar"
                width={40}
                height={40}
                className="object-cover w-full h-full"
              />
            </span>
        <button onClick={handleLogout} className="px-4 py-1 border cursor-pointer border-gray-200 bg-white text-gray-700 rounded-sm">Logout</button>
        </div>

       

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <SlidersHorizontal size={20} className="text-gray-600" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <div className="flex flex-col gap-4 p-6 mt-7">
              <button
                onClick={() => setActiveTab("investors")}
                className={cn(
                  `inline-flex text-sm bg-white border border-gray-300 px-3 py-2 items-center justify-start rounded-sm text-gray-700 gap-2 w-full`,
                  {
                    "bg-[#3a80f3] text-white border-[#3a80f3]":
                      activeTab === "investors",
                  },
                )}
              >
                <DollarSign size={16} /> Investors
              </button>

              <button
                onClick={() => setActiveTab("companies")}
                className={cn(
                  `inline-flex text-sm bg-white border border-gray-300 px-3 py-2 items-center justify-start rounded-md text-gray-700 gap-2 w-full`,
                  {
                    "bg-[#3a80f3] text-white border-[#3a80f3]":
                      activeTab === "companies",
                  },
                )}
              >
                <Building2 size={16} /> Companies
              </button>

              {/* <Link
                href="/my-list"
                className="inline-flex text-sm bg-white border border-gray-300 px-3 py-2 items-center justify-start rounded-md text-gray-700 gap-2 w-full"
              >
                <span className="size-4 bg-gray-400 rounded-full"></span> My List
              </Link> */}
              <MyListDropdown />
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default NavBar;
