import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import axiosInstance from "../../utils/axiosInstance";
import useThemeStore from "@/store/useThemeStore";
import { Theme } from "@/store/profileStore";
import { useQueryClient } from "@tanstack/react-query";

interface ToogleThemeButtonProps {
  className?: string;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ToogleThemeButton = ({
  className,
  theme,
  setTheme,
}: ToogleThemeButtonProps) => {
  const cache = useQueryClient();
  const handleToogleTheme = async () => {
    console.log(theme);
    try {
      if (theme === "light") {
        setTheme("dark");
      }
      if (theme === "dark") {
        setTheme("light");
      }
    } catch (error: any) {
      console.log(error.data);
    }
  };
  return (
    <button className={className} onClick={handleToogleTheme}>
      {theme === "light" && <DarkModeIcon />}
      {theme === "dark" && <LightModeIcon />}
    </button>
  );
};

export default ToogleThemeButton;
