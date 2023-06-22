// import { NavLink, Outlet } from "react-router-dom";
// import { Typography } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";

import MobileRootLayout from "./MobileRootLayout";
import DesktopRootLayout from "./DesktopRootLayout";

const RootLayout = () => {
  const isMobile = useMediaQuery("(max-width:767px)");
  const isMedium = useMediaQuery("(min-width:768px)");

  return (
    <div className="overflow-hidden">
      {isMobile && <MobileRootLayout />}
      {isMedium && <DesktopRootLayout />}
      <main className="mt-13 ">
        <Outlet />
      </main>
      <footer className="bg-red-700 py-36">dad</footer>
    </div>
  );
};

export default RootLayout;
