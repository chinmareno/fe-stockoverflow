import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const LoginButton = ({ size, className }) => {
  return (
    <NavLink className={className} to="/user/login">
      <Button size={size} variant="outlined">
        Login
      </Button>
    </NavLink>
  );
};

export default LoginButton;
