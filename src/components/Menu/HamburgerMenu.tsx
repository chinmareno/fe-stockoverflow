import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import ToogleThemeButton from "../Button/ToogleThemeButton";
import { Children } from "@/utils/interface/IReact";

const HamburgerMenu = ({ children }: Children) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className=" relative">
      {/* Hamburger Menu */}
      <button className=" m-0 border  bg-red-300 p-0" onClick={handleMenuClick}>
        {isMenuOpen ? (
          <CloseIcon className=" basic-color " />
        ) : (
          <MenuIcon className=" basic-color m-0 p-0 " />
        )}
      </button>
      <div
        className={`absolute right-0 top-[26px] flex  h-screen flex-col gap-4 bg-amber-500 pl-10 pr-20 pt-4 shadow-md duration-300   ${
          isMenuOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-100"
        }`}
      >
        <ToogleThemeButton className="absolute right-1 top-1" />
        {children}
      </div>
    </div>
  );
};

export default HamburgerMenu;
