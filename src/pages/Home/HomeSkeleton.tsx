import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const HomeSkeleton = () => {
  return (
    <div>
      <Skeleton className="h-7 w-screen lg:h-8" />
    </div>
  );
};

export default HomeSkeleton;
