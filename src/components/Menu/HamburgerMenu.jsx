import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import ToogleThemeButton from "../Button/ToogleThemeButton";

const HamburgerMenu = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className=" relative">
      {/* Hamburger Menu */}
      <button className=" border bg-red-300  p-0 m-0" onClick={handleMenuClick}>
        {isMenuOpen ? (
          <CloseIcon className=" basic-color " />
        ) : (
          <MenuIcon className=" basic-color p-0 m-0 " />
        )}
      </button>
      <div
        className={`duration-300 absolute top-[26px] right-0  shadow-md pl-10 pr-20 gap-4 h-screen pt-4 flex flex-col bg-amber-500   ${
          isMenuOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-100"
        }`}
      >
        <ToogleThemeButton className="absolute top-1 right-1" />
      </div>
    </div>
  );
};

export default HamburgerMenu;
