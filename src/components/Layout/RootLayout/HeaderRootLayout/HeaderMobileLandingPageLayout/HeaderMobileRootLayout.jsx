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
import LoginButton from "../../../../Button/LoginButton";
import SignupButton from "../../../../Button/SignupButton";
import ToogleThemeButton from "../../../../Button/ToogleThemeButton";

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
    <div
      className={`fixed w-screen top-0  h-13 z-10 basic-color drop-shadow-md items-center flex justify-between`}
    >
      <Logo className="ml-3 text-lg" />
      <SignupButton className="ml-auto mr-4" size="small" />
      <LoginButton size="small" />
      <ToogleThemeButton className="mx-2" />
    </div>
  );
};

export default HeaderMobileRootLayout;
