import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import { NavLink } from "react-router-dom";

export type FontSize = "small" | "medium" | "large";

export interface ChangeAnotherAccountButtonProps {
  className?: string;
  iconSize: FontSize;
}
const ChangeAnotherAccountButton = ({
  className = "",
  iconSize,
}: ChangeAnotherAccountButtonProps) => {
  return (
    <NavLink to="/user/change-account" className={className}>
      <PeopleOutlineOutlinedIcon fontSize={iconSize} />
      <div className=" flex items-center">Change another Account</div>
    </NavLink>
  );
};

export default ChangeAnotherAccountButton;
