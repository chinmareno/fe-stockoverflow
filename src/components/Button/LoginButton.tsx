import { Button } from "@mui/material";
import { NavLink } from "react-router-dom";
import { FontSize } from "./ChangeAnotherAccountButton";

export type ButtonSize = FontSize;
export interface LoginButtonProps {
  size: ButtonSize;
  className?: string;
}
const LoginButton = ({ size, className }: LoginButtonProps) => {
  return (
    <NavLink className={className} to="/user/login">
      <Button size={size} variant="outlined">
        Login
      </Button>
    </NavLink>
  );
};

export default LoginButton;
