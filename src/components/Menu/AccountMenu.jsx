import { PersonPinCircleOutlined } from "@mui/icons-material";
import axiosInstance from "../../utils/axios";
import { useState } from "react";
import AccountCard from "../Card/AccountCard";
import { useRef } from "react";
import { useEffect } from "react";

const AccountMenu = () => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [profile, setProfile] = useState({});
  const handleAccountClick = async () => {
    setIsAccountOpen(!isAccountOpen);
    if (!isAccountOpen) {
      try {
        const res = await axiosInstance.get("/user/profile");
        const { username } = res.data;
        console.log(username);
        setProfile({ username });
      } catch (error) {
        console.log("error adalah :  " + error);
      }
    }
  };

  const accountMenuRef = useRef(null);
  const handleOutsideClick = (event) => {
    if (!accountMenuRef.current.contains(event.target)) {
      setIsAccountOpen(false);
    }
  };
  useEffect(() => {
    window.addEventListener("click", handleOutsideClick);

    return () => {
      window.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={accountMenuRef}>
      <button onClick={handleAccountClick}>
        <div className="flex border mr-1 transition duration-200 dark:text-stone-400 dark:hover:text-stone-200 text-neutral-700 hover:text-neutral-500 justify-center flex-col items-center  rounded-full  ">
          <PersonPinCircleOutlined fontSize="medium" />
        </div>
      </button>
      {isAccountOpen && <AccountCard profile={profile} />}
    </div>
  );
};

export default AccountMenu;
