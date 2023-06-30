import "./App.css";
import "typeface-open-sans";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import Overview from "./pages/Overview";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";

import AlderonStock from "./pages/Stock/AlderonStock";
import AddItem, { addItemAction } from "./pages/AddItem";

import EditAccountImage from "./pages/auth/EditAccountImage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import RootLayout from "./components/Layout/RootLayout";
import ItemsLayout from "./components/Layout/ItemsLayout";
import Test from "./pages/Test";
import CheckCookie from "./pages/CheckCookie";
import ThemeProvider from "./context/ThemeProvider";

function App(): JSX.Element {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="test" element={<Test />} />
        <Route path="user">
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="edit-account-image" element={<EditAccountImage />} />
          <Route index element={<Navigate to="login" />} />
        </Route>

        <Route path="overview" element={<RootLayout />}>
          <Route index element={<LandingPage />} />
        </Route>

        {/* this bottom is cookie protected route */}
        <Route element={<CheckCookie />}>
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
          <Route path="items" element={<ItemsLayout />}>
            <Route index element={<Overview />} />
            <Route
              path="add-item"
              action={addItemAction}
              element={<AddItem />}
            />
            <Route path="alderon" element={<AlderonStock />} />
          </Route>
        </Route>
        {/* this top is cookie protected route */}

        <Route path="/" element={<Navigate to="overview" />} />
        <Route path="*" element={<NotFound />} />
      </>
    )
  );

  return (
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
