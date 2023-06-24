import "./App.css";
import "typeface-open-sans";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Overview from "./pages/Overview";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

import ErrorHome from "./pages/Error/ErrorHome";

import SteelStock, { steelLoader } from "./pages/Stock/SteelStock";
import AlderonStock, { alderonLoader } from "./pages/Stock/AlderonStock";
import StockIndex from "./pages/Stock/StockIndex";
import AddItem, { addItemAction } from "./pages/AddItem";

import EditAccountImage from "./pages/auth/EditAccountImage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import RootLayout from "./components/Layout/RootLayout";
import ItemsLayout from "./components/Layout/ItemsLayout";
import StockLayout from "./components/Layout/StockLayout";
import Test from "./pages/test";
import { createContext, useState } from "react";
import Theme from "./pages/Theme";

export const ThemeContext = createContext(null);
function App() {
  const [theme, setTheme] = useState("light");

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route element={<Theme />}>
        <Route path="user">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="edit-account-image" element={<EditAccountImage />} />
          <Route index element={<Navigate to="signup" />} />
        </Route>
        <Route path="/" element={<RootLayout />}>
          <Route path="test" element={<Test />} />
          <Route index element={<Home />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
          <Route path="items" element={<ItemsLayout />}>
            <Route errorElement={<ErrorHome />}>
              <Route index element={<Overview />} />
              <Route
                path="add-item"
                action={addItemAction}
                element={<AddItem />}
              />
              <Route path="stock" element={<StockLayout />}>
                <Route index element={<StockIndex />}></Route>
                <Route
                  loader={alderonLoader}
                  path="alderon"
                  element={<AlderonStock />}
                />
                <Route
                  loader={steelLoader}
                  path="steel"
                  element={<SteelStock />}
                />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Route>
      </Route>
    )
  );

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <RouterProvider router={router} />
    </ThemeContext.Provider>
  );
}

export default App;
