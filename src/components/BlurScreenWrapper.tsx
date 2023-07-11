import { ReactNode } from "react";

const BlurScreenWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="fixed h-screen w-screen bg-gray-300/60">{children}</div>
  );
};

export default BlurScreenWrapper;
