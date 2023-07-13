import { ReactNode } from "react";

const BlurScreenWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed z-40 h-screen w-screen bg-gray-300/60">
      {children}
    </div>
  );
};

export default BlurScreenWrapper;
