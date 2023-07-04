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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { wait } from "@/hooks/useProfileQuery";

const MobileItemsHeader = () => {
  const { pathname } = useLocation();
  const currentLocation = pathname.split("/").splice(2, 1);
  const { theme, setTheme } = useThemeStoreItems();
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile"],
    queryFn: () => wait(),
    placeholderData: { username: "Guest" },
  });
  return (
    <header className="relative flex justify-between">
      <NavLink to="/user/edit-account-image">
        <Avatar>
          <AvatarImage src={profile?.image} />
          <AvatarFallback>{profile?.username}</AvatarFallback>
        </Avatar>
      </NavLink>
      <NavigationMenu className="flex items-center justify-center">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="uppercase">
              {currentLocation}
            </NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink className="flex flex-col items-center  divide-y-2 px-3 pb-2 pt-1 capitalize">
                <IconButton
                  iconClassName="ml-1"
                  icon={<HouseIcon fontSize="small" />}
                  title="Home"
                  to="home"
                />
                <IconButton
                  icon={<LayersIcon fontSize="small" />}
                  title="Stock"
                  to="stock"
                />
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
        className="relative  z-20 flex flex-col text-clip whitespace-nowrap text-sm"
      >
        <div className="flex flex-col gap-6">
          <NavLink to="/user/edit-account">Manage your Account</NavLink>
          <NavLink to="/user/change-account">Change Account</NavLink>
        </div>
      </HamburgerMenu>
    </header>
  );
};

export default MobileItemsHeader;
