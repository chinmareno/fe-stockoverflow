import PersonIcon from "@mui/icons-material/Person";
import GoogleAccountCard from "../../../components/AccountCard";
import { NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Logo from "../../../components/Logo";
import Navbar from "../../../components/Navbar";

const DesktopRootLayout = () => {
  const accountMenuRef = useRef(null);

  const [isAccountOpen, setIsAccountOpen] = useState(false);

  useEffect(() => {
    if (isAccountOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
    }
  }, [isAccountOpen]);

  const handleOutsideClick = (event) => {
    console.log(event);
    console.log(event.target);
    console.log(accountMenuRef);
    console.log(accountMenuRef.current);
    if (!accountMenuRef.current.contains(event.target)) {
      setIsAccountOpen(false);
    }
  };

  const handleAccountClick = () => {
    setIsAccountOpen(!isAccountOpen);
  };

  return (
    <div>
      <header>
        <div className="fixed  w-screen top-0  h-13 z-20 basic-color drop-shadow-lg flex items-center justify-between ">
          {/* Logo(Left) */}
          <div className="ml-6">
            <NavLink className="text-2xl ">
              <Logo />
            </NavLink>
          </div>

          {/* Navbar(Middle) */}
          <div className="flex gap-16 justify-center mr-28">
            <Navbar to="/">Home</Navbar>
            <Navbar to="/user/signup">login</Navbar>
            <Navbar to="/user/login ">singup</Navbar>
          </div>

          {/* Account(Right)  */}
          <div
            ref={accountMenuRef}
            className="mr-10 z-40 justify-center items-center"
          >
            <button onClick={handleAccountClick}>
              <div className="flex border mr-1 transition duration-200 dark:text-stone-400 dark:hover:text-stone-200 text-neutral-700 hover:text-neutral-500 justify-center flex-col items-center  rounded-full  ">
                <PersonIcon fontSize="medium" />
              </div>
            </button>
            {isAccountOpen && (
              <div className="fixed  h-72 flex-col top-13 y-50 right-4">
                <GoogleAccountCard onClick={handleAccountClick} />
              </div>
            )}
          </div>
        </div>
        {/* Popup Menu when the Account Clicked*/}
      </header>
    </div>
  );
};

export default DesktopRootLayout;
