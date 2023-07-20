import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import { ReactNode } from "react";
import ToogleThemeButton from "../Button/ToogleThemeButton";
import useIsMenuOpenStore from "@/store/useIsMenuOpenStore";

interface HamburgerMenuProps {
  className: string;
  children: ReactNode;
  theme: string;
  setTheme: (theme: string) => void;
}
const HamburgerMenu = ({
  children,
  setTheme,
  className,
  theme,
}: HamburgerMenuProps) => {
  const { isMenuOpen, setIsMenuOpen } = useIsMenuOpenStore();

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
        className={`ring-navy-400 absolute right-0 top-[41px] flex h-screen  flex-col gap-5 bg-[#F8F8F8] px-6 pt-4 text-[#333] shadow-md ring-1 duration-300  dark:bg-[#333] dark:text-[#F8F8F8] dark:ring-slate-400   ${
          isMenuOpen
            ? "translate-x-0 opacity-100"
            : "translate-x-full opacity-0"
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
