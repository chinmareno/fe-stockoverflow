import { useMediaQuery } from "@mui/material";
import MobileItemsHeader from "./MobileItemsHeader";
import DesktopItemsHeader from "./DesktopItemsHeader";
import { Outlet } from "react-router-dom";
import useThemeStoreItems from "@/store/useThemeStoreitems";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";

const ItemsLayout = () => {
  const isMobile = useMediaQuery("(max-width:767px)");
  const isMedium = useMediaQuery("(min-width:768px)");
  const { data: theme } = useQuery({
    queryKey: ["theme"],
    queryFn: async () => {
      const { data }: any = await axiosInstance.get("/user/theme");
      return data.theme;
    },
    placeholderData: "light",
  });
  const { theme: themeStore } = useThemeStoreItems();

  return (
    <div className={themeStore || theme}>
      <div
        className="background 
        bg-[#F5F5F5 ] text-black
         dark:bg-neutral-900 dark:text-white"
      >
        <>
          {isMobile && <MobileItemsHeader theme={themeStore || theme} />}
          {isMedium && <DesktopItemsHeader theme={themeStore || theme} />}
        </>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ItemsLayout;
