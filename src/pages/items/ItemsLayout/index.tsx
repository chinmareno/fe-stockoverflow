import { useMediaQuery } from "@mui/material";
import MobileItemsHeader from "./MobileItemsHeader";
import DesktopItemsHeader from "./DesktopItemsHeader";
import { Outlet } from "react-router-dom";
import useThemeStoreItems from "@/store/useThemeStoreitems";

const ItemsLayout = () => {
  const isMobile = useMediaQuery("(max-width:767px)");
  const isMedium = useMediaQuery("(min-width:768px)");
  const { theme } = useThemeStoreItems();

  return (
    <div className={theme}>
      <div
        className="background 
        bg-[#F5F5F5 ] text-black
         dark:bg-neutral-900 dark:text-white"
      >
        <>
          {isMobile && <MobileItemsHeader />}
          {isMedium && <DesktopItemsHeader />}
        </>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ItemsLayout;
