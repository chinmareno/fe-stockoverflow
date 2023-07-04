import NavLinkCustom from "@/components/NavLinkCustom";
import { wait } from "@/hooks/useProfileQuery";
import MainAccountCard from "@/components/Card/AccountCard/MainAccountCard";
import Logo from "../../../components/Logo";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import HouseIcon from "@mui/icons-material/House";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LayersIcon from "@mui/icons-material/Layers";

const DesktopItemsHeader = () => {
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => wait(),
    placeholderData: { username: "Guest" },
  });
  const cache = useQueryClient();
  if (isLoading) {
    console.log("loading");
  }
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const handleProfileClick = () => {
    if (!isProfileOpen) {
      cache.invalidateQueries({ queryKey: ["profile"] });
    }
    setIsProfileOpen(!isProfileOpen);
  };
  return (
    <header className=" flex items-center justify-center">
      <Logo iconSize="large" className="mr-auto select-none text-3xl" />
      <nav className="mr-40 mt-4 flex gap-10">
        <NavLinkCustom to="home">
          <HouseIcon />
        </NavLinkCustom>
        <NavLinkCustom to="stock">
          <LayersIcon />
        </NavLinkCustom>
        <NavLinkCustom to="profit">
          <AttachMoneyIcon />
        </NavLinkCustom>
      </nav>
      <div className="relative ml-auto mr-2 flex flex-col items-end">
        <button onClick={handleProfileClick}>
          <Avatar>
            <AvatarImage src={profile ? profile?.image : ""} />
            <AvatarFallback>{profile?.username}</AvatarFallback>
          </Avatar>
        </button>
        {isProfileOpen && (
          <MainAccountCard
            className="  right-6 top-14 h-auto w-80 rounded-2xl   bg-zinc-900 text-slate-50"
            innerColor="bg-zinc-800"
            hoverColor="hover:bg-zinc-700"
            iconSize="medium"
            cameraIconSize="small"
            profile={profile}
            ifLoading={isLoading}
            cameraIconPosition="bottom-2 right-3"
          />
        )}
      </div>
    </header>
  );
};

export default DesktopItemsHeader;
