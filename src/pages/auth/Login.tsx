import FormLayout from "../../components/Layout/FormLayout";
import LoginForm from "../../components/LoginForm";
import heroPc from "@/assets/image/loginpc.jpeg";
import heroMobile from "@/assets/image/loginmobile.jpeg";
import { Box, LinearProgress, useMediaQuery } from "@mui/material";
import useLoadingStore from "@/store/useLoadingStore";
import BlurScreenWrapper from "@/components/BlurScreenWrapper";

const Login = () => {
  const isMobile = useMediaQuery("(max-width:767px)");
  const { isLoginLoading } = useLoadingStore();
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
      {isLoginLoading && (
        <BlurScreenWrapper>
          <Box className="absolute left-0 top-0" sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        </BlurScreenWrapper>
      )}
      <FormLayout
        logoSize={isMobile ? "medium" : "large"}
        title="Welcome Back!"
        bottomDescription="Don't have an account?"
        linkTitle="Signup"
        to="/user/signup"
      >
        <LoginForm />
      </FormLayout>
    </div>
  );
};

export default Login;
