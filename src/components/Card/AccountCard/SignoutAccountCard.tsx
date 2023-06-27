import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import axiosInstance from "../../../utils/axios";
import { useNavigate } from "react-router-dom";

interface SignOutAccountCardProps {
  className?: string;
}
const SignOutAccountCard = ({ className }: SignOutAccountCardProps) => {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    try {
      await axiosInstance.post("/user/logout");
      console.log("success logout n clear cookie");
      navigate("/overview");
    } catch (error) {
      console.log("error clear cookie");
    }
  };
  return (
    <button className={className} onClick={handleLogOut}>
      <ExitToAppIcon />
      <div>Sign out</div>
    </button>
  );
};

export default SignOutAccountCard;
