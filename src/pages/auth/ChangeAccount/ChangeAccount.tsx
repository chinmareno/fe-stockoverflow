import { Box, LinearProgress, useMediaQuery } from "@mui/material";
import heroPc from "../../../../src/assets/image/loginpc.jpeg";
import heroMobile from "../../../../src/assets/image/loginmobile.jpeg";
import EditAccountLayout from "../EditAccount/EditAccountLayout";
import ChangeAccountForm from "./ChangeAccountForm";
import useLoadingStore from "@/store/useLoadingStore";
import BlurScreenWrapper from "@/components/BlurScreenWrapper";

const ChangeAccount = () => {
  const isMobile = useMediaQuery("(max-width:767px)");
  const { isChangeAccountLoading } = useLoadingStore();
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
      {isChangeAccountLoading && (
        <BlurScreenWrapper>
          <Box className="absolute top-0" sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        </BlurScreenWrapper>
      )}
      <EditAccountLayout
        logoSize="large"
        title="Change Your Account"
        to="/items"
      >
        <ChangeAccountForm />
      </EditAccountLayout>
    </div>
  );
};

export default ChangeAccount;
