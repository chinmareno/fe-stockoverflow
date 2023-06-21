import { NavLink } from "react-router-dom";

const Navbar = ({ children, to }) => {
  return (
    <div className="">
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive
            ? "underline underline-offset-8  decoration-2  "
            : "transition-opacity duration-200 hover:opacity-100 opacity-50"
        }
      >
        {children}
      </NavLink>
    </div>
  );
};

export default Navbar;
