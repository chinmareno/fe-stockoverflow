import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import { NavLink } from "react-router-dom";
const ChangeAnotherAccountButton = ({
  onClick = "",
  className = "",
  fontSize = "medium",
}) => {
  return (
    <NavLink onClick={onClick} to="/user/signup" className={className}>
      <PeopleOutlineOutlinedIcon fontSize={fontSize} />
      <div className=" flex items-center">Change another account</div>
    </NavLink>
  );
};

export default ChangeAnotherAccountButton;
