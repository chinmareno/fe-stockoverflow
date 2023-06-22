import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import LayersIcon from "@mui/icons-material/Layers";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const MobileRootLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
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

  return (
    <header>
      <div className="fixed   w-screen top-0  h-13 z-10 basic-color drop-shadow-lg flex justify-between ">
        {/* Brand Logo */}
        <NavLink className="w-17 flex items-center  h-full">
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
        className={`fixed flex  justify-end w-screen h-screen z-20 top-13 -mt-1 transition  duration-300 ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div
          className="w-11/12 basic-color pt-1 flex-col justify-end  
          }"
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
            <Typography
              variant="button"
              className=" text-gray-200  py-2 px-7 border-b-2 border-black dark:border-white border-solid h-10 w-full"
            >
              <button className="uppercase" onClick={handleLanguageClick}>
                Language
              </button>
            </Typography>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MobileRootLayout;
