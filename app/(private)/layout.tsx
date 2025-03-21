import React from 'react';
import Header from '@/components/Header';
import Filters from '@/components/Filters';
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-dvh bg-white overflow-hidden">
      <Header />
      <Filters />
      <div className="flex-1 overflow-hidden p-4">{children}</div>
    </div>
  );
};

export default layout;
