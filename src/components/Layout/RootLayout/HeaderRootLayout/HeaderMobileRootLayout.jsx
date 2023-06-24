import { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import LayersIcon from "@mui/icons-material/Layers";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ThemeContext } from "../../../../main";
import axiosInstance from "../../../../utils/axios";

const HeaderMobileRootLayout = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClickToFalse = () => {
    setIsMenuOpen(false);
  };

  const handleToogleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      const token = document.cookie.split("; ").find((cookie) => {
        return cookie.startsWith("jwt=");
      });
      if (token) {
        console.log("ada jwt");
      } else {
        console.log("gd jir");
      }
    }
    if (theme === "dark") {
      setTheme("light");
    }
  };

  const handleLanguageClick = () => {
    return;
  };

  const location = useLocation();
  const userLocation = (location) => {
    switch (location.pathname) {
      case "/":
        return "Overview";
      case "/user/login":
        return "Login";
      case "/user/signup":
        return "Signup";
    }
  };

  const menu = [
    {
      title: "signup",
      to: "/user/signup",
    },
    {
      title: "login",
      to: "/user/login",
    },
    {
      title: "overview",
      to: "/items",
    },
  ];

  const [isHeaderHidden, setIsHeaderHidden] = useState(false);
  let previousScrollPosition =
    window.scrollY || document.documentElement.scrollTop;

  function handleScroll() {
    const currentScrollPosition =
      window.scrollY || document.documentElement.scrollTop;
    //Going Down
    if (
      currentScrollPosition > previousScrollPosition &&
      currentScrollPosition > 16
    ) {
      previousScrollPosition = currentScrollPosition;
      setIsHeaderHidden(true);
    }
    //Going Up
    else {
      previousScrollPosition = currentScrollPosition;
      setIsHeaderHidden(false);
    }
  }
  window.addEventListener("scroll", handleScroll);

  return (
    <>
      <div
        className={`fixed transition duration-500 ${
          isHeaderHidden ? "-translate-y-13" : "translate-y-0"
        } w-screen top-0  h-13 z-10 basic-color drop-shadow-lg flex justify-between`}
      >
        {/* Brand Logo */}
        <NavLink
          onClick={handleMenuClickToFalse}
          className="w-17 flex items-center  h-full"
        >
          <LayersIcon className=" w-13 flex ml-4 mt-1 h-full " />
        </NavLink>

        <div className="flex  justify-center items-center text-center">
          {userLocation(location)}
        </div>
        {/* Hamburger Menu */}
        <Button className=" w-13 h-full   p-0 m-0" onClick={handleMenuClick}>
          {isMenuOpen ? (
            <CloseIcon className=" basic-color " />
          ) : (
            <MenuIcon fontSize="large" className=" basic-color p-0 m-0 mt-1" />
          )}
        </Button>
      </div>
      {/* Sidebar Nav */}
      <div
        className={`fixed flex justify-end w-screen h-screen z-20 top-14 -mt-1 transition  duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className="w-11/12 basic-color pt-1 flex-col justify-end  
          "
        >
          <div className="flex flex-col">
            {menu.map((menu) => (
              <NavLink
                key={menu.title}
                to={menu.to}
                className="py-2 px-7 border-b-2 border-black dark:border-white border-solid h-10 w-full"
                onClick={handleMenuClick}
              >
                <Typography
                  variant="button"
                  className=" text-gray-200 uppercase"
                >
                  {menu.title}
                </Typography>
              </NavLink>
            ))}
            {/*Todo Language Select */}
            <button
              className="border-black text-gray-200 flex justify-start  py-2 px-7 h-10 dark:border-white border-b-2 uppercase w-full"
              onClick={handleLanguageClick}
            >
              <Typography variant="button" className="  ">
                Language
              </Typography>
            </button>

            <button
              onClick={handleToogleTheme}
              className="border-black text-gray-200 flex justify-start  py-2 px-7 h-10 dark:border-white border-b-2 uppercase w-full"
            >
              {theme === "light" && (
                <Typography variant="button">
                  dark mode
                  <DarkModeIcon />
                </Typography>
              )}
              {theme === "dark" && (
                <Typography variant="button">
                  light mode <LightModeIcon />
                </Typography>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderMobileRootLayout;
