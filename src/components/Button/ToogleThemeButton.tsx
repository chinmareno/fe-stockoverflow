import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import axiosInstance from "../../utils/axiosInstance";

type Theme = "dark" | "light";
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
  const handleToogleTheme = async () => {
    try {
      if (theme === "light") {
        if (document.cookie) {
          axiosInstance.patch("/user/change-theme", { theme: "dark" });
        }
      }
      setTheme("dark");
      if (theme === "dark") {
        if (document.cookie) {
          axiosInstance.patch("/user/change-theme", { theme: "light" });
        }
        setTheme("light");
      }
    } catch (error) {
      console.log(error);
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
