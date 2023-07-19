import { PersonPinCircleOutlined } from "@mui/icons-material";
import axiosInstance from "../../utils/axiosInstance";
import { useState } from "react";
import AccountCard from "../Card/AccountCard";
import { useRef } from "react";
import { useEffect } from "react";
import { FontSize } from "../Button/ChangeAnotherAccountButton";

interface AccountMenuProps {
  innerColor: string;
  iconSize: FontSize;

  outerColor: string;
  hoverColor: string;
  textColor: string;
}
const AccountMenu = ({
  innerColor,
  iconSize,
  outerColor,
  hoverColor,
  textColor,
}: AccountMenuProps) => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [profile, setProfile] = useState({
    username: "",
    image: "",
    theme: "light",
  });
  const handleAccountClick = async () => {
    setIsAccountOpen(!isAccountOpen);
    if (!isAccountOpen) {
      try {
        const res = await axiosInstance.get("/user/profile");
        const { username, image = "", theme } = res.data;
        setProfile({ username, image, theme });
      } catch (error) {
        console.log("error adalah :  " + error);
      }
    }
  };

  const accountMenuRef = useRef<HTMLDivElement | null>(null);
  const handleOutsideClick = (event: MouseEvent) => {
    if (!accountMenuRef.current?.contains(event.target as Node)) {
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
        <div className="mr-1 flex flex-col items-center justify-center rounded-full border text-neutral-700 transition duration-200 hover:text-neutral-500 dark:text-stone-400  dark:hover:text-stone-200  ">
          <PersonPinCircleOutlined fontSize="medium" />
        </div>
      </button>
      {isAccountOpen && (
        <AccountCard
          theme={profile.theme}
          iconSize={iconSize}
          hoverColor={hoverColor}
          textColor={textColor}
          innerColor={innerColor}
          outerColor={outerColor}
          profile={profile}
        />
      )}
    </div>
  );
};

export default AccountMenu;
