import { useContext, useState } from "react";
import { ThemeContext } from "../../../../../App";
import axiosInstance from "../../../../../utils/axios";
import { useEffect } from "react";
import Logo from "../../../../Logo";
import LoginButton from "../../../../Button/LoginButton";
import SignupButton from "../../../../Button/SignupButton";
import ToogleThemeButton from "../../../../Button/ToogleThemeButton";

const HeaderMobileRootLayout = () => {
  return (
    <div
      className={`fixed w-screen top-0  h-13 z-10 basic-color drop-shadow-md items-center flex justify-between`}
    >
      <Logo className="ml-3 text-lg" />
      <SignupButton className="ml-auto mr-4" size="small" />
      <LoginButton size="small" />
      <ToogleThemeButton className="mx-2" />
    </div>
  );
};

export default HeaderMobileRootLayout;
