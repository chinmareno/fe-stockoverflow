import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import LayersIcon from "@mui/icons-material/Layers";
import MenuIcon from "@mui/icons-material/Menu";
import { Button, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { ThemeContext } from "../../../../../App";
import axiosInstance from "../../../../../utils/axios";
import { useEffect } from "react";
import Logo from "../../../../Logo";
import HamburgerMenu from "./HamburgerMenu";

const HeaderMobileRootLayout = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClickToFalse = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const firstFetch = async () => {
      const token = document.cookie.split("; ").find((cookie) => {
        return cookie.startsWith("jwt=");
      });

      if (token) {
        const { data } = await axiosInstance.get("/user/profile");
        setTheme(data.theme);
        console.log(data);
      }
    };

    firstFetch();
  }, []);

  const handleLanguageClick = () => {
    return;
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
      <div
        className={`fixed text-sm transition duration-500 w-screen top-0  h-13 z-10 basic-color drop-shadow-lg items-center flex justify-between`}
      >
        {/* Brand Logo */}
        <NavLink
          onClick={handleMenuClickToFalse}
          className="w-17 ml-2 flex items-center  "
        >
          <Logo fontSize="text-lg" />
        </NavLink>

        {/* Sign up and Login  */}
        <NavLink className="ml-auto mr-4" to="/user/signup">
          <Button size="small" variant="contained">
            Sign up
          </Button>
        </NavLink>
        <NavLink className="mr-4" to="/user/login">
          <Button size="small" variant="outlined">
            Login
          </Button>
        </NavLink>
      </div>
    </>
  );
};

export default HeaderMobileRootLayout;
