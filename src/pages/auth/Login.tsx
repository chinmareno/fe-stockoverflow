import FormLayout from "../../components/Layout/FormLayout";
import LoginForm from "../../components/LoginForm";
import heroPc from "../../../assets/image/loginpc.jpeg";
import heroMobile from "../../../assets/image/loginmobile.jpeg";
import { useMediaQuery } from "@mui/material";

const Login = () => {
  const isMobile = useMediaQuery("(max-width:767px)");

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
