import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";

const StockLayout = () => {
  //styles
  const navLink = "mx-5 ";
  const nav = "flex flex-row justify-center";

  return (
    <div>
      <header>
        <nav className={nav}>
          <NavLink to="alderon" className={navLink}>
            Alderon
          </NavLink>
          <NavLink to="steel" className={navLink}>
            Steel
          </NavLink>
        </nav>
      </header>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default StockLayout;
