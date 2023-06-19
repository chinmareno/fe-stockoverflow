/* eslint-disable react/prop-types */
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ArrowBackIos } from "@mui/icons-material";

const ImagePagination = ({ data }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleNext = () => {
    setCurrentPage((currentPage + 1) % data.length);
  };

  const handleBack = () => {
    setCurrentPage(currentPage ? currentPage - 1 : data.length - 1);
  };

  return (
    <div className="w-full">
      <Button
        className=" left-1"
        sx={{
          "&:hover": {
            backgroundColor: "white",
            fontSize: "Large",
          },
        }}
        onClick={handleBack}
      >
        <ArrowBackIos fontSize="inherit" />
      </Button>
      <div
        key={data[currentPage].title}
        className="flex justify-center relative"
      >
        <div className="text-white absolute left-0 items-center  bg-gradient-to-r from-cyan-500 to-bg-transparent flex justify-center z-50 px-60 py-12   ">
          <Typography className="flex  justify-center" variant="h3">
            {data[currentPage].title}
          </Typography>
        </div>
        <img
          className="relative"
          src={data[currentPage].image}
          style={{ width: "800px", maxWidth: "100%", height: "400px" }}
          alt={data[currentPage].title}
        />
      </div>
      <Button
        sx={{
          "&:hover": {
            backgroundColor: "white",
            fontSize: "Large",
          },
        }}
        onClick={handleNext}
        className="right-11"
      >
        <ArrowForwardIosIcon fontSize="inherit" />
      </Button>
    </div>
  );
};

export default ImagePagination;
