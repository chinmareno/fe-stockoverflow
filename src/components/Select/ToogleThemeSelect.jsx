import LightModeIcon from "@mui/icons-material/LightMode";
import { useContext } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { MenuItem, Select } from "@mui/material";
import { ThemeContext } from "../../App";

const ToogleThemeSelect = ({ className }) => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <Select
      variant="standard"
      className={className}
      value={theme}
      onChange={(e) => setTheme(e.target.value)}
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
