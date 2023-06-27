import { Outlet, useNavigate } from "react-router-dom";

const CheckCookie = () => {
  const navigate = useNavigate();
  if (!document.cookie) {
    navigate("/overview");
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default CheckCookie;
