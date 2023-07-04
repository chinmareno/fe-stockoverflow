import LoginButton from "../../../components/Button/LoginButton";
import SignupButton from "../../../components/Button/SignupButton";
import Logo from "../../../components/Logo";
import ToogleThemeSelect from "../../../components/Select/ToogleThemeSelect";
import useThemeStore from "@/store/useThemeStore";

const HeaderDesktopRootLayout = () => {
  const { theme, setTheme } = useThemeStore();
  return (
    <div className="fixed top-0 z-20  flex h-16 w-screen items-center bg-slate-100 drop-shadow-lg transition duration-300 dark:bg-neutral-900 ">
      <Logo iconSize="medium" className="ml-6 select-none text-3xl" />
      <SignupButton className="ml-auto mr-5 " size="large" />
      <LoginButton size="large" />
      <ToogleThemeSelect
        setTheme={setTheme}
        theme={theme}
        className="ml-7 mr-3 dark:text-white"
      />
    </div>
  );
};

export default HeaderDesktopRootLayout;
