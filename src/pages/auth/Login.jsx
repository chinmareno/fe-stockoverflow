import FormLayout from "../../components/Layout/FormLayout";
import LoginForm from "../../components/LoginForm";
import heroPc from "../../../assets/image/loginpc.jpeg";
import heroMobile from "../../../assets/image/loginmobile.jpeg";
import { useMediaQuery } from "@mui/material";

const Login = () => {
  const isMobile = useMediaQuery("(max-width:767px)");

  return (
    <div
      className="flex h-screen bg-black  flex-col justify-center  items-center "
      style={{
        backgroundImage: `url(${isMobile ? heroMobile : heroPc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <FormLayout
        title="Welcome Back!"
        description="Don't have account?"
        navbutton="Register now"
        to="/user/signup"
      >
        <LoginForm />
      </FormLayout>
    </div>
  );
};

export default Login;
