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
      <main className=" mt-14 flex h-full flex-col items-center md:mt-16 ">
        <Outlet />
      </main>
    );
  }
};

export default CheckCookie;
