// import { NavLink, Outlet } from "react-router-dom";
// import { Typography } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";

import HeaderDesktopRootLayout from "./HeaderRootLayout/HeaderMobileRootLayout";
import HeaderMobileRootLayout from "./HeaderRootLayout/HeaderDesktopRootLayout";
import FooterRootLayout from "./FooterRootLayout";

const RootLayout = () => {
  const isMobile = useMediaQuery("(max-width:767px)");
  const isMedium = useMediaQuery("(min-width:768px)");

  return (
    <div className="overflow-hidden">
      <header>
        {isMobile && <HeaderDesktopRootLayout />}
        {isMedium && <HeaderMobileRootLayout />}
      </header>
      <main className="pt-17  w-screen flex flex-col items-center justify-center text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-blackepicgame">
        <Outlet />
      </main>
      <footer className="bg-gray py-5  border-t-2 border-white">
        <FooterRootLayout />
      </footer>
    </div>
  );
};

export default RootLayout;
