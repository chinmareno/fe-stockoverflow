/* eslint-disable react/prop-types */
import { Button, Typography } from "@mui/material";
import { useState } from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { ArrowBackIos } from "@mui/icons-material";

interface ImagePaginationProps {
  data: {
    image: string;
    title: string;
  }[];
}
const ImagePagination = ({ data }: ImagePaginationProps) => {
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
        className="relative flex justify-center"
      >
        <div className="to-bg-transparent absolute left-0 z-50  flex items-center justify-center bg-gradient-to-r from-cyan-500 px-60 py-12 text-white   ">
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
