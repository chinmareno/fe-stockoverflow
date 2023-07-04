import { ThemeContext } from "@/context/ThemeProvider";
import { useContext } from "react";

const useThemeContext = () => useContext(ThemeContext);

export default useThemeContext;
