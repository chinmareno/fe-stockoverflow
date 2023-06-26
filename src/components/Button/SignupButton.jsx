import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";

const SignupButton = ({ size, className }) => {
  return (
    <NavLink className={className} to="/user/signup">
      <Button size={size} variant="contained">
        Sign up
      </Button>
    </NavLink>
  );
};

export default SignupButton;
