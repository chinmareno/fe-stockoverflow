// import { NavLink, Outlet } from "react-router-dom";
// import { Typography } from "@mui/material";
import { useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import AOS from "aos";

import FooterRootLayout from "./FooterLandingPage";
import HeaderDesktopRootLayout from "./HeaderLandingPage/HeaderDesktopRootLayout";
import HeaderMobileRootLayout from "./HeaderLandingPage/HeaderMobileRootLayout";
import { useEffect } from "react";
import useThemeStore from "../../store/useThemeStore";

const RootLayout = () => {
  const isMobile = useMediaQuery("(max-width:767px)");
  const isMedium = useMediaQuery("(min-width:768px)");

  const { theme } = useThemeStore();

  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className={theme}>
      <div className="h-full w-screen overflow-x-hidden  bg-white text-black  dark:bg-neutral-900 dark:text-white">
        <header className="z-50">
          {isMobile && <HeaderMobileRootLayout />}
          {isMedium && <HeaderDesktopRootLayout />}
        </header>
        <main className="b mt-14 flex h-full flex-col items-center md:mt-16 ">
          <Outlet />
        </main>
        <footer className=" flex h-52 w-full flex-col items-center justify-center py-4    lg:flex-row lg:items-end lg:gap-28">
          <FooterRootLayout />
        </footer>
      </div>
    </div>
  );
};

export default RootLayout;
