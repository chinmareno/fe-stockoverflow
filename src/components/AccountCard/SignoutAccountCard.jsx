import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { NavLink } from "react-router-dom";

const SignOutAccountCard = () => {
  return (
    <>
      <ExitToAppIcon />
      <div className="flex  items-center">Sign out</div>
    </>
  );
};

export default SignOutAccountCard;
