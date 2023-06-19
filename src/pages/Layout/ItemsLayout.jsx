import { Outlet } from "react-router";
import { NavLink } from "react-router-dom";
import isActiveNavLink from "../../utils/is-active-color";

const ItemsLayout = () => {
  //styles
  const navLink = "mx-9 ";
  const nav = "flex flex-row justify-center ";
  const main = "flex flex-row justify-center";
  return (
    <div>
      <header>
        <nav className={nav}>
          <NavLink to="/" className={navLink}>
            {({ isActive }) => (
              <span className={isActive ? isActiveNavLink() : ""}>Home</span>
            )}
          </NavLink>
          <NavLink to="stock" className={navLink}>
            {({ isActive }) => (
              <span className={isActive ? isActiveNavLink() : ""}>Stock</span>
            )}
          </NavLink>
          <NavLink to="add-item" className={navLink}>
            {({ isActive }) => (
              <span className={isActive ? isActiveNavLink() : ""}>
                Add Item
              </span>
            )}
          </NavLink>
        </nav>
      </header>
      <main className={main}>
        <Outlet />
      </main>
    </div>
  );
};

export default ItemsLayout;
