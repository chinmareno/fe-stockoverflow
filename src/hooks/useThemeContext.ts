import { useContext } from "react";
import { ThemeContext } from "@/context/ThemeProvider";

const useThemeContext = () => useContext(ThemeContext);
export default useThemeContext;
