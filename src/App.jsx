import "./App.css";
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import ErrorHome from "./pages/Error/ErrorHome";
import SteelStock, { steelLoader } from "./pages/Stock/SteelStock";
import AlderonStock, { alderonLoader } from "./pages/Stock/AlderonStock";
import StockLayout from "./pages/Layout/StockLayout";
import StockIndex from "./pages/Stock/StockIndex";
import AddItem, { addItemAction } from "./pages/AddItem";
import ItemsLayout from "./pages/Layout/ItemsLayout";
import NotFound from "./pages/NotFound";
import RootLayout from "./pages/Layout/RootLayout";
import Signup from "./user/Signup";
import Login from "./user/Login";
import Overview from "./pages/Overview";
import Home from "./pages/Home";
import FIxPosition from "./pages/FIxPosition";
import FixPosition from "./pages/FIxPosition";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route element={<FixPosition />}>
          <Route path="user">
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route index element={<Navigate to="signup" />} />
          </Route>
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
        <Route index element={<Home />} />
      </Route>
    )
  );
  return <RouterProvider router={router} />;
}

export default App;
