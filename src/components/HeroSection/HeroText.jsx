import { Typography } from "@mui/material";
import NavButton from "../NavButton";

const HeroText = ({ size }) => {
  return (
    <div className="text-slate-200 grid grid-rows-3 ">
      <Typography
        variant="h2"
        component="h1"
        className="flex  justify-center   my-3 pb-5 z-30"
      >
        Welcome to
        <span className="ml-4 text-black">
          stock
          <span className="font-semibold  text-stroke-black">overflow</span>
        </span>
      </Typography>
      <Typography
        variant="h5"
        component="p"
        className="flex justify-center items-center  bg-gradient-to-br from-black/80  py-7 capitalize  rounded-3xl "
      >
        we are helping you to prevent your stock overflow again
      </Typography>
      <div className=" flex justify-center items-center">
        <NavButton
          className="flex justify-center"
          to="/user/signup"
          size={size}
        >
          Get started
        </NavButton>
      </div>
    </div>
  );
};

export default HeroText;
