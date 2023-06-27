import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { MenuItem, Select } from "@mui/material";
import useThemeContext from "@/hooks/useThemeContext";
import { ThemeContextType, ThemeType } from "@/context/ThemeProvider";

interface ToogleThemeSelectProps {
  className: string;
}

const ToogleThemeSelect = ({ className }: ToogleThemeSelectProps) => {
  const { theme, setTheme } = useThemeContext() as ThemeContextType;
  return (
    <Select
      variant="standard"
      className={className}
      value={theme}
      onChange={(e) => setTheme(e.target.value as ThemeType)}
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
