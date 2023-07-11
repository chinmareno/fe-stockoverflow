import NavLinkCustom from "@/components/NavLinkCustom";
import { wait } from "@/hooks/useProfileQuery";
import MainAccountCard from "@/components/Card/AccountCard/MainAccountCard";
import Logo from "../../../components/Logo";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import HouseIcon from "@mui/icons-material/House";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LayersIcon from "@mui/icons-material/Layers";
import TooltipCustom from "@/components/TooltipCustom";
import useIsAccountOpenStore from "@/store/useIsAccountOpenStore";

const DesktopItemsHeader = ({ theme }: { theme: string }) => {
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => wait(),
    placeholderData: { username: "Guest" },
  });
  const cache = useQueryClient();

  const { isProfileOpen, setIsProfileOpen } = useIsAccountOpenStore();
  const handleProfileClick = () => {
    if (!isProfileOpen) {
      cache.invalidateQueries({ queryKey: ["profile"] });
    }
    setIsProfileOpen(!isProfileOpen);
  };
  const avatarFallBack = profile?.username.substring(0, 5);
  return (
    <header className=" flex items-center justify-center bg-[#a6c0d4] py-4 shadow-lg  dark:bg-[#333333]">
      <Logo iconSize="large" className="ml-5 mr-auto select-none text-3xl" />
      <nav className="mr-40 mt-4 flex gap-10 ">
        <NavLinkCustom  to="home">
          <HouseIcon />
        </NavLinkCustom>
        <NavLinkCustom to="stock">
          <LayersIcon />
        </NavLinkCustom>
        <NavLinkCustom to="profit">
          <AttachMoneyIcon />
        </NavLinkCustom>
      </nav>

      <div className="relative ml-auto mr-12 flex flex-col items-end">
        <TooltipCustom tooltip={profile?.username}>
          <button onClick={handleProfileClick}>
            <Avatar className="h-16 w-16">
              <AvatarImage src={profile ? profile?.image : ""} />
              <AvatarFallback className="bg-inherit">
                {avatarFallBack}
              </AvatarFallback>
            </Avatar>
          </button>
        </TooltipCustom>

        {isProfileOpen && (
          <MainAccountCard
            theme={theme}
            className="  right-6 top-14 z-40 h-auto w-80 rounded-2xl  bg-zinc-900 text-slate-50"
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
