import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const InvoiceSkeleton = () => {
  return (
    <div className="mt-4 flex w-full flex-col gap-1 ">
      <Skeleton className="mb-1 h-8 w-screen lg:h-9" />
      <Skeleton className="h-7 w-screen  lg:h-8" />
      <Skeleton className="h-7 w-screen lg:h-8" />
      <Skeleton className="h-7 w-screen lg:h-8" />
      <Skeleton className="h-7 w-screen lg:h-8" />
      <Skeleton className="h-7 w-screen lg:h-8" />
      <Skeleton className="h-7 w-screen lg:h-8" />
    </div>
  );
};

export default InvoiceSkeleton;
