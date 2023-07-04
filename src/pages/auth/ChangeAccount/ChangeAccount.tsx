import { useMediaQuery } from "@mui/material";
import heroPc from "../../../../assets/image/loginpc.jpeg";
import heroMobile from "../../../../assets/image/loginmobile.jpeg";
import EditAccountLayout from "../EditAccount/EditAccountLayout";
import ChangeAccountForm from "./ChangeAccountForm";

const ChangeAccount = () => {
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
