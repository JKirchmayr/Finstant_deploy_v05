'use client';
import React from 'react';
import { Building2, DollarSign, SlidersHorizontal } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Image from 'next/image';
const NavBar = () => {
  const pathname = usePathname();
  const type = pathname.replace('/', '');
  return (
    <header className="px-4 h-10 bg-white border-b border-gray-300 flex items-center gap-2">
      <nav className="h-full flex items-center gap-4">
        <Link href={'/'}>
          <Image src="/images/logo.png" alt="Log" width={150} height={20} />
        </Link>
      </nav>
      {/* Search Option */}
      <div className="flex-1 flex items-center gap-3">
        <h3>Search for: </h3>
        <div className="flex items-center gap-2">
          <Link
            href={'/investors'}
            className={cn(
              `inline-flex text-xs h-full bg-white border border-gray-300 overflow-hidden gap-2 w-full px-2 py-1 items-center justify-center rounded-sm text-gray-500`,
              {
                'bg-[#3a80f3] text-white border-[#3a80f3]': pathname === '/investors',
              }
            )}
          >
            <DollarSign size={14} />
            Investors
          </Link>
          <Link
            href={'/companies'}
            className={cn(
              `inline-flex text-xs bg-white border border-gray-300 overflow-hidden gap-2 w-full h-full px-2 py-1 items-center justify-center rounded-sm text-gray-500`,
              {
                'bg-[#3a80f3] text-white border-[#3a80f3]': pathname === '/companies',
              }
            )}
          >
            <Building2 size={15} />
            Companies
          </Link>
          <Link
            href={'/companies'}
            className={cn(
              `flex text-xs bg-white border border-gray-300 overflow-hidden gap-2 min-w-[140px] px-2 py-1 items-center justify-center rounded-sm text-gray-500`,
              {
                'bg-[#3a80f3] text-white border-[#3a80f3]': pathname === '/companies',
              }
            )}
          >
            Deals
            <span className="text-xs inline-block whitespace-nowrap text-[10px] bg-[#3a80f3]/10 text-[#3a80f3] border border-[#3a80f3]/50 px-1.5 py-0.5 rounded-[4px]">
              Coming Soon
            </span>
          </Link>
        </div>
      </div>

      {/* Profile */}
      <div className="flex items-center gap-3">
        <Link href={'/my-list'} className="text-xs text-gray-500 font-medium">
          My List
        </Link>
        <span className="size-7 p-1 border border-gray-400 rounded-full bg-gray-300 text-gray-500"></span>
      </div>
    </header>
  );
};

export default NavBar;
