import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

const ContactUs = () => {
  return (
    <div className="flex md:text-xl font-helvetica items-center  flex-col gap-4 ">
      <div>Contact Us :</div>
      <div className=" flex gap-11 md:gap-14">
        <button className="flex text-blue-600 dark:text-inherit items-center ">
          <FacebookIcon />
          <div className="hidden md:block">Facebook</div>
        </button>
        <button className="flex text-pink-600 dark:text-inherit items-center">
          <InstagramIcon />
          <div className="hidden md:block">Instagram</div>
        </button>
        <button className="flex text-cyan-600 dark:text-inherit items-center">
          <TwitterIcon />
          <div className="hidden md:block">Twitter</div>
        </button>
        <button className="flex items-center">
          <GitHubIcon />
          <div className="hidden md:block">Github</div>
        </button>
      </div>
    </div>
  );
};

export default ContactUs;
