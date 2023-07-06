import IconButton from "@/components/Button/IconButton";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import HouseIcon from "@mui/icons-material/House";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LayersIcon from "@mui/icons-material/Layers";
import { NavLink, useLocation } from "react-router-dom";
import HamburgerMenu from "@/components/Menu/HamburgerMenu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useThemeStoreItems from "@/store/useThemeStoreitems";
import { useQuery } from "@tanstack/react-query";
import { wait } from "@/hooks/useProfileQuery";
import useIsMenuOpenStore from "@/store/useIsMenuOpenStore";

const MobileItemsHeader = ({ theme }) => {
  const { pathname } = useLocation();
  const currentLocation = pathname.split("/").splice(2, 1);
  const { setTheme } = useThemeStoreItems();
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: () => wait(),
    placeholderData: { username: "Guest" },
  });
  const { setIsMenuOpen } = useIsMenuOpenStore();

  const avatarFallBack = profile?.username.substring(0, 5);

  return (
    <header className="relative flex  justify-between bg-[#F9FAFB] pb-3 shadow-md dark:bg-[#333333]">
      <NavLink className="ml-1" to="/user/edit-account-image">
        <Avatar>
          <AvatarImage src={profile?.image} />
          <AvatarFallback className="bg-inherit">
            {avatarFallBack}
          </AvatarFallback>
        </Avatar>
        <p className="absolute left-2 top-[37px]  text-xs">
          {profile?.username}
        </p>
      </NavLink>
      <NavigationMenu
        onClick={() => setIsMenuOpen(false)}
        className="flex items-center justify-center"
      >
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-[#F9FAFB] uppercase dark:bg-[#333333]">
              {currentLocation}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="flex flex-col  items-center  divide-y-2 px-3 pb-2 pt-1 capitalize">
              <NavigationMenuLink>
                <IconButton
                  iconClassName="ml-1"
                  icon={<HouseIcon fontSize="small" />}
                  title="Home"
                  to="home"
                />
              </NavigationMenuLink>

              <NavigationMenuLink>
                <IconButton
                  icon={<LayersIcon fontSize="small" />}
                  title="Stock"
                  to="stock"
                />
              </NavigationMenuLink>

              <NavigationMenuLink>
                <IconButton
                  icon={<AttachMoneyIcon />}
                  title="Profit"
                  to="profit"
                />
              </NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <HamburgerMenu
        setTheme={setTheme}
        theme={theme}
        className="relative z-20 mt-3 flex flex-col text-clip whitespace-nowrap text-sm"
      >
        <NavLink className="mt-2 " to="/user/edit-account">
          Manage your Account
        </NavLink>
        <NavLink to="/user/change-account">Change another Account</NavLink>
      </HamburgerMenu>
    </header>
  );
};

export default MobileItemsHeader;
