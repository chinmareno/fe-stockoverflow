import Logo from "../../../components/Logo";
import LoginButton from "../../../components/Button/LoginButton";
import SignupButton from "../../../components/Button/SignupButton";
import ToogleThemeButton from "../../../components/Button/ToogleThemeButton";
import useThemeStore from "@/store/useThemeStore";

const HeaderMobileRootLayout = () => {
  const { theme, setTheme } = useThemeStore();
  return (
    <div
      className={`h-13 fixed top-0 z-10 flex w-screen items-center justify-between bg-slate-50 py-3 drop-shadow-md dark:bg-neutral-900`}
    >
      <Logo iconSize="small" className="ml-1 select-none text-lg" />
      <SignupButton className="ml-auto mr-1" size="small" />
      <LoginButton size="small" />
      <ToogleThemeButton className="mx-1" setTheme={setTheme} theme={theme} />
    </div>
  );
};

export default HeaderMobileRootLayout;
