import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useContext } from "react";
import { ThemeContext } from "../../../../../App";

const HamburgerMenu = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { theme, setTheme } = useContext(ThemeContext);
  const handleToogleTheme = () => {
    setTheme(!theme);
  };

  //   const handleToogleTheme = async () => {
  //     const token = document.cookie.split("; ").find((cookie) => {
  //       return cookie.startsWith("jwt=");
  //     });
  //     if (theme === "light") {
  //       setTheme("dark");
  //       if (token) {
  //         await axiosInstance.patch("/user/change-theme", { theme: "dark" });
  //         console.log("ada jwt");
  //       }
  //     }
  //     if (theme === "dark") {
  //       setTheme("light");
  //       if (token) {
  //         await axiosInstance.patch("/user/change-theme", { theme: "light" });
  //         console.log("ada jwt");
  //       }
  //     }
  //   };
  return (
    <>
      {/* Hamburger Menu */}
      <button
        className=" relative border bg-red-300  p-0 m-0"
        onClick={handleMenuClick}
      >
        {isMenuOpen ? (
          <CloseIcon className=" basic-color " />
        ) : (
          <MenuIcon className=" basic-color p-0 m-0 " />
        )}
        <div
          className={`duration-300 absolute shadow-md pl-10 pr-20 gap-4 h-screen pt-4 flex flex-col bg-amber-500/25 top-6 right-0 ${
            isMenuOpen
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          <button onClick={handleToogleTheme}>
            {theme === "light" && (
              <DarkModeIcon className="absolute top-1 right-1" />
            )}
          </button>
          {/* {theme==="dark"&&} */}
          {/* {children} */}
          <div>menu</div>
          <div>menu</div>
        </div>
      </button>
    </>
  );
};

export default HamburgerMenu;
{
  /* <div
  className={` flex flex-col bg-slate-500 divide-y z-20 transition  duration-300 ${
    isMenuOpenn ? "translate-x-0" : "translate-x-full"
  }`}
> */
}
