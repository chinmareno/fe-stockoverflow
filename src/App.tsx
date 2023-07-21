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
import NotFound from "./pages/Constant/NotFound";

import EditAccountImage from "./pages/auth/EditAccountImage";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";

import LandingPageLayout from "./pages/LandingPage/LandingPageLayout";
import CheckCookie from "./pages/CheckCookie";
import TermsOfService from "./pages/Constant/TermsOfService";
import PrivacyPolicy from "./pages/Constant/PrivacyPolicy";
import Home from "./pages/Home/Home";
import Profit from "./pages/Profit/Profit";
import Stock from "./pages/items/Stock/Stock";
import ItemsLayout from "./pages/items/ItemsLayout";
import EditAccount from "./pages/auth/EditAccount/EditAccount";
import ChangeAccount from "./pages/auth/ChangeAccount/ChangeAccount";
import Invoice from "./pages/Invoice/Invoice";
import NewInvoice from "./pages/Invoice/NewInvoice/NewInvoice";
import EditInvoice from "./pages/Invoice/EditInvoice/EditInvoice";
import Error from "./pages/Constant/Error";
import UnpaidInvoice from "./pages/Invoice/UnpaidInvoice/UnpaidInvoice";

function App(): JSX.Element {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="privacy-policy" element={<PrivacyPolicy />} />
        <Route path="terms-of-service" element={<TermsOfService />} />

        <Route path="user" errorElement={<Error />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route element={<CheckCookie />}>
            <Route path="edit-account-image" element={<EditAccountImage />} />
            <Route path="edit-account" element={<EditAccount />} />
            <Route path="change-account" element={<ChangeAccount />} />
          </Route>
          <Route index element={<Navigate to="login" />} />
        </Route>

        {/* this bottom is cookie protected route */}
        <Route path="items" errorElement={<Error />}>
          <Route path="home" element={<Home />} />
          <Route path="*" element={<ItemsLayout />}>
            <Route path="stock" element={<Stock />} />
            <Route path="profit" element={<Profit />} />
            <Route path="invoice">
              <Route path="new-invoice" element={<NewInvoice />} />
              <Route path="edit-invoice/:id" element={<EditInvoice />} />
              <Route path="unpaid-invoice" element={<UnpaidInvoice />} />
              <Route index element={<Invoice />} />
            </Route>
            <Route index element={<Navigate to="/items/home" />} />
          </Route>
        </Route>
        {/* this top is cookie protected route */}

        <Route path="/" element={<LandingPageLayout />}>
          <Route index element={<LandingPage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </>
    )
  );

  return <RouterProvider router={router} />;
}

export default App;
