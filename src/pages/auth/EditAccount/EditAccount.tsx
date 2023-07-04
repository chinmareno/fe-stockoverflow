import { useMediaQuery } from "@mui/material";
import heroPc from "../../../../assets/image/loginpc.jpeg";
import heroMobile from "../../../../assets/image/loginmobile.jpeg";
import EditAccountForm from "./EditAccountForm";
import EditAccountLayout from "./EditAccountLayout";
import { useState } from "react";
import EditAccountFormAuth from "./EditAccountFormAuth";

const EditAccount = () => {
  const isMobile = useMediaQuery("(max-width:767px)");
  const [isOpen, setIsOpen] = useState(false);

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
      className="flex h-screen flex-col  items-center justify-center  bg-black "
      style={{
        backgroundImage: `url(${isMobile ? heroMobile : heroPc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <EditAccountLayout logoSize="large" title="Edit Your Account" to="/items">
        <EditAccountForm setIsOpen={setIsOpen} />
      </EditAccountLayout>
    </div>
  );
};

export default EditAccount;
