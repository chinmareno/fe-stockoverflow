import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { MenuItem, Select, SelectChangeEvent } from "@mui/material";
import useProfileStore, { Theme } from "@/store/profileStore";
import axiosInstance from "@/utils/axiosInstance";

interface ToogleThemeSelectProps {
  className?: string;
  theme: Theme;
  setTheme: (theme: Theme) => void;
}
const ToogleThemeSelect = ({
  className,
  theme,
  setTheme,
}: ToogleThemeSelectProps) => {
  const handleThemeChange = async (e: SelectChangeEvent) => {
    setTheme(e.target.value as Theme);
    try {
      if (document.cookie) {
        axiosInstance.patch("/user/change-theme", {
          theme: e.target.value,
        });
      }
    } catch (error: any) {
      console.log(error.data);
    }
  };
  return (
    <Select
      variant="standard"
      className={className}
      value={theme}
      onChange={handleThemeChange}
    >
      <MenuItem value="light">
        <LightModeIcon />
      </MenuItem>
      <MenuItem value="dark">
        <DarkModeIcon />
      </MenuItem>
    </Select>
  );
};

export default ToogleThemeSelect;
