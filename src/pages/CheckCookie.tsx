import axiosInstance from "@/utils/axiosInstance";
import { Outlet, useNavigate } from "react-router-dom";
const CheckCookie = () => {
  const navigate = useNavigate();

  if (!document.cookie) {
    navigate("/overview");
  } else {
    axiosInstance
      .get("/user/profile")
      .then((response) => {
        return;
      })
      .catch((error) => {
        navigate("/");
      });
    return (
      <main>
        <Outlet />
      </main>
    );
  }
};

export default CheckCookie;
