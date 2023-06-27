import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
const BackToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Add smooth scrolling animation
    });
  };
  return (
    <button
      onClick={scrollToTop}
      className=" flex lg:flex-row-reverse flex-col md:w-96 lg:w-56 lg:m-0 lg:p-3 items-center gap-1 w-full lg:items-center lg:justify-center py-  bg-black dark:bg-blackepicgame text-white pb-3 mt-4 rounded-sm hover:bg"
    >
      <KeyboardArrowUpIcon />
      <div className="flex flex-col text-lg">back to top</div>
    </button>
  );
};

export default BackToTop;
