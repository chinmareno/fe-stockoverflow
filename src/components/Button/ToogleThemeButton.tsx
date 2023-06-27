import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import axiosInstance from "../../utils/axios";
import { ThemeContextType } from "@/context/ThemeProvider";
import useThemeContext from "@/hooks/useThemeContext";

interface ToogleThemeButtonProps {
  className?: string;
}
const ToogleThemeButton = ({ className }: ToogleThemeButtonProps) => {
  const { theme, setTheme } = useThemeContext() as ThemeContextType;
  const handleToogleTheme = async () => {
    const token = document.cookie.split("; ").find((cookie) => {
      return cookie.startsWith("jwt=");
    });
    if (theme === "light") {
      setTheme("dark");
      if (token) {
        await axiosInstance.patch("/user/change-theme", { theme: "dark" });
        console.log("ada jwt");
      }
    }
    if (theme === "dark") {
      setTheme("light");
      if (token) {
        await axiosInstance.patch("/user/change-theme", { theme: "light" });
        console.log("ada jwt");
      }
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
