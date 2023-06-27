import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { LoginButtonProps } from "./LoginButton";

interface SignupButtonProps extends LoginButtonProps {}

const SignupButton = ({ size, className }: SignupButtonProps) => {
  return (
    <NavLink className={className} to="/user/signup">
      <Button size={size} variant="contained">
        Sign up
      </Button>
    </NavLink>
  );
};

export default SignupButton;
