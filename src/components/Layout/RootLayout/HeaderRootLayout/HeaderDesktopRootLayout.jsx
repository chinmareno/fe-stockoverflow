import LoginButton from "../../../Button/LoginButton";
import SignupButton from "../../../Button/SignupButton";
import Logo from "../../../Logo";
import ToogleThemeSelect from "../../../Select/ToogleThemeSelect";

const HeaderDesktopRootLayout = () => {
  return (
    <div className="fixed transition duration-300  w-screen top-0 h-16 z-20 basic-color drop-shadow-lg flex items-center ">
      <Logo className="select-none text-3xl ml-6" />
      <SignupButton className="ml-auto mr-5" size="large" />
      <LoginButton size="large" />
      <ToogleThemeSelect className="dark:text-white ml-7 mr-11" />
    </div>
  );
};

export default HeaderDesktopRootLayout;
