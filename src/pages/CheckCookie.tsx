import { Toaster } from "@/components/ui/toaster";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
const CheckCookie = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!document.cookie) {
      navigate("/overview");
    }
    const checkCookie = async () => {
      const res = await axiosInstance.get("/user/profile");
      if (res.status !== 200) {
        navigate("/overview");
      }
    };
    try {
      checkCookie();
    } catch (error) {
      navigate("/overview");
    }
  });

  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
};

export default CheckCookie;
