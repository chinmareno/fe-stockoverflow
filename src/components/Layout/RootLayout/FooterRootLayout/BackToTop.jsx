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
      className="flex items-center gap-1  bg-black dark:bg-blackepicgame text-white py-3 px-5 rounded-sm hover:bg"
    >
      Back To Top <KeyboardArrowUpIcon />
    </button>
  );
};

export default BackToTop;
