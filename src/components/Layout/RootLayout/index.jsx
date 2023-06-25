// import { NavLink, Outlet } from "react-router-dom";
// import { Typography } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";

import HeaderDesktopRootLayout from "./HeaderRootLayout/HeaderMobileLandingPageLayout/HeaderMobileRootLayout";
import HeaderMobileRootLayout from "./HeaderRootLayout/HeaderDesktopRootLayout";
import FooterRootLayout from "./FooterRootLayout";

const RootLayout = () => {
  const isMobile = useMediaQuery("(max-width:767px)");
  const isMedium = useMediaQuery("(min-width:768px)");

  return (
    <div className="overflow-x-hidden text-black dark:text-slate-400 bg-slate-100 dark:bg-blackepicgame">
      <header className="z-50">
        {isMobile && <HeaderDesktopRootLayout />}
        {isMedium && <HeaderMobileRootLayout />}
      </header>
      <main className="mt-17 flex flex-col h-full items-center ">
        <Outlet />
      </main>
      <footer className="flex bg-stone-300 dark:bg-darksecondary py-4  w-full h-52 px-3 flex-col lg:gap-24 lg:flex-row items-center lg:items-end justify-center">
        <FooterRootLayout />
      </footer>
    </div>
  );
};

export default RootLayout;
