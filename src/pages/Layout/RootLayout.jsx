import { NavLink, Outlet } from "react-router-dom";
import { Typography } from "@mui/material";
import Logo from "../../components/Logo";

const RootLayout = () => {
  return (
    <>
      <header>
        <div className="fixed top-0 left-0 z-30 w-screen flex justify-start items-center pl-6 pt-1 text-2xl  ">
          <Logo />
        </div>
        <div className="fixed top-0 left-0 w-screen flex  gap-6 pb-2 justify-center items-center py-1 pl-1 min-h-min z-20 bg-gradient-to-r to-black from-white">
          <div>Home</div>
          <div>stock </div>
        </div>
        <div className="fixed top-0 left-0 z-30 w-screen flex justify-end pr-6 pt-1">
          <NavLink
            to="/user/login"
            className="text-slate-300 hover:text-white active:text-blue-800 "
          >
            <Typography variant="caption">Login</Typography>
          </NavLink>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default RootLayout;
