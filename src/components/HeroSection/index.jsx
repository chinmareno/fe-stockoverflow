import { Img } from "react-image";
import HeroText from "./HeroText";
import { useMediaQuery } from "@mui/material";

const HeroSection = () => {
  const mobileQUery = useMediaQuery("(max-width:735px)");

  const tabletQuery = useMediaQuery("(min-width:736) and  (max-width:792px)");
  const normalQuery = useMediaQuery("(min-width:793px)");

  const heroImage = {
    position: "absolute",
    top: 0,
    left: 0,
    objectFit: "cover",
  };
  return (
    <>
      {mobileQUery && (
        <div className=" bg-lime-500 h-screen overflow-hidden   w-screen relative">
          <div className="flex w-full  h-full ">
            <Img
              src="/assets/hero.avif"
              className="w-full  h-full flex-nowrap"
              style={heroImage}
            />
          </div>
          <div className="flex  justify-center">
            <div className="absolute   top-1/3  bg-gray-500/50 border rounded-md pt-6 px-9">
              <HeroText fontSize="clamp(17px, 6vw, 100px)" size="small" />
            </div>
          </div>
        </div>
      )}
      {tabletQuery && (
        <div className=" bg-lime-500 h-screen overflow-hidden   w-screen relative">
          <div className="flex w-full  h-full ">
            <Img
              src="/assets/hero.avif"
              className="w-full  h-full flex-nowrap"
              style={heroImage}
            />
          </div>
          <div className="flex  justify-center">
            <div className="absolute   top-1/3  bg-gray-500/50 border  rounded-md pt-6 px-9">
              <HeroText fontSize="clamp(25px, 6vw, 100px)" size="small" />
            </div>
          </div>
        </div>
      )}
      {normalQuery && (
        <div className=" bg-lime-500 h-screen overflow-hidden   w-screen relative">
          <div className="flex w-full  h-full ">
            <Img
              src="/assets/hero.avif"
              className="w-full   h-full flex-nowrap"
              style={heroImage}
            />
          </div>
          <div className="flex  justify-center">
            <div className="absolute   top-1/3  bg-gray-500/50  border border-double    border-white  rounded-sm pt-6 px-6">
              <HeroText fontSize="clamp(37px, 4vw, 100px)" size="Large" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;
