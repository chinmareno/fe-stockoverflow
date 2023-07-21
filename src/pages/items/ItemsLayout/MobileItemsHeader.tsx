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
import useIsMenuOpenStore from "@/store/useIsMenuOpenStore";
import axiosInstance from "@/utils/axiosInstance";
import { useEffect, useState } from "react";
import ReceiptIcon from "@mui/icons-material/Receipt";

const MobileItemsHeader = ({ theme }) => {
  const { pathname } = useLocation();
  const currentLocation = pathname.split("/").splice(2, 1);
  const { setTheme } = useThemeStoreItems();
  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: async () => {
      const { data } = await axiosInstance.get("/user/profile");
      return data;
    },
    placeholderData: { username: "Guest" },
  });
  const [image, setImage] = useState("");
  useEffect(() => {
    if (profile.image) {
      setImage(import.meta.env.VITE_SERVER_URL + "/" + profile.image);
    }
  }, [profile]);

  const { setIsMenuOpen } = useIsMenuOpenStore();

  const avatarFallBack = profile?.username.substring(0, 5);
  return (
    <header className="relative flex  justify-between bg-[#a6c0d4] pb-3 shadow-md dark:bg-[#333333]">
      <NavLink className="ml-1" to="/user/edit-account-image">
        <Avatar className="h-[38px] w-[38px]">
          <AvatarImage src={image} />
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
            <NavigationMenuTrigger className="bg-transparent uppercase hover:bg-transparent focus:bg-transparent active:bg-transparent">
              {currentLocation}
            </NavigationMenuTrigger>
            <NavigationMenuContent className="flex flex-col  items-center  divide-y-2 px-3 pb-2 pt-1 capitalize">
              <NavigationMenuLink>
                <IconButton
                  icon={<HouseIcon fontSize="small" />}
                  title="Home"
                  to="home"
                  iconClassName="-ml-3 mr-1"
                />
              </NavigationMenuLink>

              <NavigationMenuLink>
                <IconButton
                  icon={<LayersIcon fontSize="small" />}
                  title="Stock"
                  to="stock"
                  iconClassName="-ml-4 mr-1"
                />
              </NavigationMenuLink>

              <NavigationMenuLink>
                <IconButton
                  icon={<AttachMoneyIcon />}
                  title="Profit"
                  to="profit"
                  iconClassName="-ml-4 mr-1"
                />
              </NavigationMenuLink>
              <NavigationMenuLink>
                <IconButton
                  icon={<ReceiptIcon />}
                  title="Invoice"
                  to="invoice"
                  iconClassName="mr-1"
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
