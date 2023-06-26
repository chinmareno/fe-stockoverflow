import PersonIcon from "@mui/icons-material/Person";
import GoogleAccountCard from "../../../AccountCard";
import { useEffect, useRef, useState } from "react";
import Logo from "../../../Logo";
import axiosInstance from "../../../../utils/axios";

const HeaderDesktopRootLayout = () => {
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
    if (!accountMenuRef.current.contains(event.target)) {
      setIsAccountOpen(false);
    }
  };

  const [profile, setProfile] = useState({});

  const handleAccountClick = async () => {
    setIsAccountOpen(!isAccountOpen);
    if (!isAccountOpen) {
      if (document.cookie) {
        try {
          const res = await axiosInstance.get("/user/profile");
          const { username } = res.data;
          console.log(username);
          setProfile({ username });
        } catch (error) {
          console.log(error);
        }
      } else {
        setProfile({ username: "Guest" });
      }
    }
  };

  const [isHeaderHidden, setIsHeaderHidden] = useState(false);

  let previousScrollPosition =
    window.scrollY || document.documentElement.scrollTop;
  function handleScroll() {
    const currentScrollPosition =
      window.scrollY || document.documentElement.scrollTop;

    if (currentScrollPosition > previousScrollPosition) {
      console.log("kebwh");
      previousScrollPosition = currentScrollPosition;

      setIsHeaderHidden(true);
    } else {
      previousScrollPosition = currentScrollPosition;
      setIsHeaderHidden(false);
    }
  }
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        className={`${
          isHeaderHidden ? "-translate-y-13" : "translate-y-0"
        } fixed transition duration-300  w-screen top-0 h-16 z-20 basic-color drop-shadow-lg flex items-center justify-between`}
      >
        {/* Logo(Left) */}
        <div className="ml-6">
          <Logo className="text-3xl" />
        </div>

        {/* Navbar(Middle) */}
        {/* <div className="flex gap-16 justify-center mr-28">
          <Navbar to="/">Home</Navbar>
          <Navbar to="/user/login">login</Navbar>
          <Navbar to="/user/login ">signup</Navbar>
        </div> */}

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
          {/* Popup Account Menu when the Account Clicked*/}
          {isAccountOpen && (
            <div className="fixed  h-72 flex-col top-13 y-50 right-4">
              <GoogleAccountCard
                profile={profile}
                onClick={handleAccountClick}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default HeaderDesktopRootLayout;
