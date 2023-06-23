import BackToTop from "./BackToTop";
import ContactUs from "./ContactUs";
import Copyright from "./Copyright";

const FooterRootLayout = () => {
  return (
    <div className="flex justify-around">
      <Copyright />
      <ContactUs />
      <BackToTop />
    </div>
  );
};

export default FooterRootLayout;
