import { Button, breadcrumbsClasses } from "@mui/material";
import { NavLink } from "react-router-dom";

const NavButton = (props) => {
  const {
    to,
    variant = "contained",
    color = "info",
    className = "",
    children,
    size,
  } = props;
  return (
    <div className={className}>
      <NavLink to={to}>
        <Button
          className="bg-blue-500  flex text-white rounded-md"
          variant={variant}
          color={color}
          size={size}
        >
          {children}
        </Button>
      </NavLink>
    </div>
  );
};

export default NavButton;
