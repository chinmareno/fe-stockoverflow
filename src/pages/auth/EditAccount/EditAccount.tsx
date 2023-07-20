import { Box, LinearProgress, useMediaQuery } from "@mui/material";
import heroPc from "../../../../src/assets/image/loginpc.jpeg";
import heroMobile from "../../../../src/assets/image/loginmobile.jpeg";
import EditAccountForm from "./EditAccountForm";
import EditAccountLayout from "./EditAccountLayout";
import { useState } from "react";
import EditAccountFormAuth from "./EditAccountFormAuth";
import useLoadingStore from "@/store/useLoadingStore";
import BlurScreenWrapper from "@/components/BlurScreenWrapper";

const EditAccount = () => {
  const isMobile = useMediaQuery("(max-width:767px)");
  const [isOpen, setIsOpen] = useState(false);
  const { isEditAccountLoading } = useLoadingStore();
  if (isOpen) {
    return (
      <div
        className="flex h-screen flex-col  items-center justify-center  bg-black "
        style={{
          backgroundImage: `url(${isMobile ? heroMobile : heroPc})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {isEditAccountLoading && (
          <BlurScreenWrapper>
            <Box className="absolute top-0" sx={{ width: "100%" }}>
              <LinearProgress />
            </Box>
          </BlurScreenWrapper>
        )}
        <EditAccountLayout
          logoSize="large"
          title="Enter Your New Username and Password"
          to="/items"
        >
          <EditAccountFormAuth />
        </EditAccountLayout>
      </div>
    );
  }
  return (
    <div
      className="relative flex h-screen flex-col  items-center justify-center  bg-black "
      style={{
        backgroundImage: `url(${isMobile ? heroMobile : heroPc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {isEditAccountLoading && (
        <BlurScreenWrapper>
          <Box className="absolute top-0" sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        </BlurScreenWrapper>
      )}
      <EditAccountLayout
        logoSize="large"
        title="Please enter your account  again"
        to="/items"
      >
        <EditAccountForm setIsOpen={setIsOpen} />
      </EditAccountLayout>
    </div>
  );
};

export default EditAccount;
