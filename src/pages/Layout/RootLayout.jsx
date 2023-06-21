// import { NavLink, Outlet } from "react-router-dom";
// import { Typography } from "@mui/material";
import LayersIcon from "@mui/icons-material/Layers";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Button,
  LinearProgress,
  Typography,
  useMediaQuery,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { useState } from "react";

import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import Logo from "../../components/Logo";
import Navbar from "../../components/Navbar";
import GoogleAccountCard from "../../components/GoogleAccountCard/GoogleAccountCard";

const RootLayout = () => {
  const isMobile = useMediaQuery("(max-width:767px)");
  const isMedium = useMediaQuery("(min-width:768px)");

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

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLanguageClick = () => {
    return;
  };

  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const handleAccountClick = () => {
    setIsAccountOpen(!isAccountOpen);
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
    <div className="overflow-hidden">
      {/* Mobile Navbar With Hamburger Menu */}
      {isMobile && (
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
            <Button
              className=" w-13 h-full   p-0 m-0"
              onClick={handleMenuClick}
            >
              {isMenuOpen ? (
                <CloseIcon className=" basic-color " />
              ) : (
                <MenuIcon
                  fontSize="large"
                  className=" basic-color p-0 m-0 mt-1"
                />
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
      )}
      {/* Regular Navbar For Tablet And Pc */}
      {isMedium && (
        <header>
          <div className="fixed  w-screen top-0  h-13 z-10 basic-color drop-shadow-lg flex items-center justify-between ">
            {/* Logo */}
            <div className="ml-6">
              <NavLink className="text-2xl ">
                <Logo />
              </NavLink>
            </div>

            {/* Navbar */}
            <div className="flex gap-16 justify-center mr-28">
              <Navbar to="/">Home</Navbar>
              <Navbar to="/user/signup">login</Navbar>
              <Navbar to="/user/login ">singup</Navbar>
            </div>

            {/* Account  */}
            <div className="mr-10 z-40 justify-center items-center">
              <button onClick={handleAccountClick}>
                <div className="flex border mr-1 transition duration-200 dark:text-stone-400 dark:hover:text-stone-200 text-neutral-700 hover:text-neutral-500 justify-center flex-col items-center  rounded-full  ">
                  <PersonIcon fontSize="medium" />
                </div>
              </button>
            </div>
          </div>
          {/* Login and Signup From Account */}
          <div
            className={`fixed w-80 h-64   flex flex-col top-13 y-50 right-1  ${
              isAccountOpen ? "visible" : "hidden"
            }`}
          >
            <GoogleAccountCard />
          </div>
        </header>
      )}
      <main className="mt-13 ">
        <Outlet />
      </main>
      <footer className="bg-red-700 py-36">dad</footer>
    </div>
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
