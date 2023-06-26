import Logo from "../../../Logo";

const HeaderDesktopRootLayout = () => {
  return (
    <>
      <div className="fixed transition duration-300  w-screen top-0 h-16 z-20 basic-color drop-shadow-lg flex items-center justify-between">
        <Logo className="text-3xl ml-6" />
      </div>
    </>
  );
};

export default HeaderDesktopRootLayout;
