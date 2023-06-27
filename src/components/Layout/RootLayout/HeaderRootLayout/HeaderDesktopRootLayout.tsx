import LoginButton from "../../../Button/LoginButton";
import SignupButton from "../../../Button/SignupButton";
import Logo from "../../../Logo";
import ToogleThemeSelect from "../../../Select/ToogleThemeSelect";

const HeaderDesktopRootLayout = () => {
  return (
    <div className="basic-color fixed top-0  z-20 flex h-16 w-screen items-center drop-shadow-lg transition duration-300 ">
      <Logo iconSize="medium" className="ml-6 select-none text-3xl" />
      <SignupButton className="ml-auto mr-5" size="large" />
      <LoginButton size="large" />
      <ToogleThemeSelect className="ml-7 mr-11 dark:text-white" />
    </div>
  );
};

export default HeaderDesktopRootLayout;
