import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { ReactNode, useState } from "react";
import ToogleThemeButton from "../Button/ToogleThemeButton";
import { Children } from "@/utils/interface/IReact";
import { Theme } from "@/store/profileStore";

interface HamburgerMenuProps {
  className: string;
  children: ReactNode;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
const HamburgerMenu = ({
  children,
  setTheme,
  className,
  theme,
}: HamburgerMenuProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleMenuClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className={` ${className}`}>
      {/* Hamburger Menu */}
      <button className=" m-0   " onClick={handleMenuClick}>
        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </button>
      <div
        className={`absolute right-0 top-[26px] flex h-screen  flex-col bg-[#F8F8F8] px-6 pt-4 text-[#333] shadow-md  duration-300 dark:bg-[#333] dark:text-[#F8F8F8]   ${
          isMenuOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-100"
        }`}
      >
        <ToogleThemeButton
          theme={theme}
          setTheme={setTheme}
          className="absolute right-1 top-1"
        />
        {children}
      </div>
    </div>
  );
};

export default HamburgerMenu;
