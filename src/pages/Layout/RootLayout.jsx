// import { NavLink, Outlet } from "react-router-dom";
// import { Typography } from "@mui/material";
import LayersIcon from "@mui/icons-material/Layers";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

import { NavLink, Outlet, useLocation } from "react-router-dom";

const RootLayout = () => {
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

  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageClick = () => {
    return;
  };

  const handleMenuClick = () => {
    setIsOpen(!isOpen);
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
    <>
      <header>
        <div className="fixed w-screen top-0  h-13 z-10 basic-color drop-shadow-lg flex justify-between ">
          {/* Brand Logo */}
          <NavLink className="w-17 flex items-center  h-full">
            <LayersIcon className=" w-13 flex ml-4 mt-1 h-full " />
          </NavLink>

          <div className="flex justify-center items-center text-center">
            {userLocation(location)}
          </div>
          {/* Hamburger Menu */}
          <Button className=" w-13 h-full   p-0 m-0" onClick={handleMenuClick}>
            {isOpen ? (
              <CloseIcon className="basic-color " />
            ) : (
              <MenuIcon fontSize="large" className="basic-color p-0 m-0 mt-1" />
            )}
          </Button>
        </div>
        {/* Sidebar Nav */}
        <div
          className={`fixed flex  justify-end w-screen h-screen z-20 top-13 -mt-1 transition  duration-300 ${
            isOpen ? "translate-x-0" : "translate-x-full"
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
      <main className="mt-13 ">
        <Outlet />
      </main>
      <footer className="bg-red-700 py-36">dad</footer>
    </>
  );
};

export default RootLayout;

{
  /* <div className="fixed top-0 left-0 z-30 w-screen flex justify-start items-center pl-6 pt-1 text-2xl  ">
            <Logo />
          </div>
          <div className="fixed top-0 left-0 w-screen flex  gap-6 pb-2 justify-center items-center py-1 pl-1 min-h-min z-20 bg-gradient-to-r to-black from-white">
            <div>Home</div>
            <div>stock </div>
          </div>
          <div className="fixed top-0 left-0 z-30 w-screen flex justify-end pr-6 pt-1">
            <NavLink
              to="/user/login"
              className="text-slate-300 hover:text-white active:text-blue-800 "
            >
              <Typography variant="caption">Login</Typography>
            </NavLink>
          </div> */
}
