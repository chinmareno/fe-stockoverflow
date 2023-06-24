import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";

const ContactUs = () => {
  return (
    <div className="flex items-center  mr-20  flex-col gap-2 ">
      <div>Contact Us :</div>
      <div className="flex gap-2">
        <button>
          <FacebookIcon />
          Facebook
        </button>
        <button>
          <InstagramIcon />
          Instagram
        </button>
        <button>
          <TwitterIcon />
          Twitter
        </button>
        <button>
          <GitHubIcon />
          Github
        </button>
      </div>
    </div>
  );
};

export default ContactUs;
