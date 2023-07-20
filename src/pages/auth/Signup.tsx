import SignupForm from "../../components/SignupForm";
import FormLayout from "../../components/Layout/FormLayout";
import { Box, LinearProgress, useMediaQuery } from "@mui/material";
import heroMobile from "@/assets/image/loginmobile.jpeg";
import heroPc from "@/assets/image/loginpc.jpeg";
import useLoadingStore from "@/store/useLoadingStore";
import BlurScreenWrapper from "@/components/BlurScreenWrapper";

const Signup = () => {
  const isMobile = useMediaQuery("(max-width:767px)");
  const { isSignupLoading } = useLoadingStore();
  return (
    <div
      className=" m-0 flex h-screen w-screen items-center justify-center overflow-hidden p-0"
      style={{
        backgroundImage: `url(${isMobile ? heroMobile : heroPc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {isSignupLoading && (
        <BlurScreenWrapper>
          <Box className="absolute top-0" sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        </BlurScreenWrapper>
      )}
      <FormLayout
        logoSize={isMobile ? "medium" : "large"}
        title="Create an account"
        bottomDescription="Already have an account?"
        linkTitle="Login"
        to="/user/login"
      >
        <SignupForm />
      </FormLayout>
    </div>
  );
};

export default Signup;
