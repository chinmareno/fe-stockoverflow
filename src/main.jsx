import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { useState } from "react";
import { createContext } from "react";

export const ThemeContext = createContext(null);

const Root = () => {
  const [theme, setTheme] = useState("light");

  return (
    <React.StrictMode>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <span className={theme}>
          <App />
        </span>
      </ThemeContext.Provider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<Root />);
