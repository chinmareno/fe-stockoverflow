import { useContext } from "react";
import { Outlet } from "react-router-dom";
import { ThemeContext } from "../App";
const Theme = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <div className={theme}>
      <Outlet />
    </div>
  );
};

export default Theme;
