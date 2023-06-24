import SignupForm from "../../components/SignupForm";
import FormLayout from "../../components/Layout/FormLayout";
import { useMediaQuery } from "@mui/material";
import heroMobile from "../../../assets/image/loginmobile.jpeg";
import heroPc from "../../../assets/image/loginpc.jpeg";

const Signup = () => {
  const isMobile = useMediaQuery("(max-width:767px)");

  return (
    <div
      className=" flex h-screen w-screen justify-center items-center overflow-hidden p-0 m-0"
      style={{
        backgroundImage: `url(${isMobile ? heroMobile : heroPc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <FormLayout
        title="Create an account"
        description="Already have an account?"
        navbutton="Login"
        to="/user/login"
      >
        <SignupForm />
      </FormLayout>
    </div>
  );
};

export default Signup;
