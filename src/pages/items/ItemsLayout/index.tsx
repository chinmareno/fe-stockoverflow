import { useMediaQuery } from "@mui/material";
import MobileItemsHeader from "./MobileItemsHeader";
import DesktopItemsHeader from "./DesktopItemsHeader";
import { Outlet } from "react-router-dom";
import useThemeStoreItems from "@/store/useThemeStoreitems";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/utils/axiosInstance";
import { largeQuery, mediumQuery, mobileQuery } from "@/utils/mediaQuery";
import { Toaster } from "@/components/ui/toaster";

const ItemsLayout = () => {
  const isMobile = useMediaQuery(mobileQuery);
  const isMedium = useMediaQuery(mediumQuery);
  const isLarge = useMediaQuery(largeQuery);
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
        bg-gray-100 text-black
         dark:bg-neutral-900 dark:text-white"
      >
        <>
          {isMedium && <MobileItemsHeader theme={themeStore || theme} />}
          {isLarge && <DesktopItemsHeader theme={themeStore || theme} />}
        </>
        <main>
          <Outlet />
          <Toaster />
        </main>
      </div>
    </div>
  );
};

export default ItemsLayout;
