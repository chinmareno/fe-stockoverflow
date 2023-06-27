import Logo from "../../../../Logo";
import LoginButton from "../../../../Button/LoginButton";
import SignupButton from "../../../../Button/SignupButton";
import ToogleThemeButton from "../../../../Button/ToogleThemeButton";

const HeaderMobileRootLayout = () => {
  return (
    <div
      className={`basic-color fixed top-0  z-10 flex h-13 w-screen items-center justify-between drop-shadow-md`}
    >
      <Logo iconSize="small" className="ml-3 select-none text-lg" />
      <SignupButton className="ml-auto mr-4" size="small" />
      <LoginButton size="small" />
      <ToogleThemeButton className="mx-2" />
    </div>
  );
};

export default HeaderMobileRootLayout;
