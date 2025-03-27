import React from "react";
import Header from "@/components/Header";
import Filters from "@/components/Filters";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-dvh w-full grid grid-rows-[44px_1fr] overflow-hidden">
      <Header />
      {/* <Filters /> */}
      {children}
    </div>
  );
};

export default layout;
