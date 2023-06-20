import PublicIcon from "@mui/icons-material/Public";

const OverviewCard = (props) => {
  const { img, title, description, children } = props;
  return (
    <div className="   flex  flex-col md:flex-row lg:flex-col dark:text-white text-black justify-center items-center p-10 mb-6 gap-5 border  rounded-2xl dark:border-darkgrey bg-transparent border-black">
      <div className="w-32 flex justify-center items-center  h-32">
        <img src={`/assets/image/${img}`} />
      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        <h2 className="text-26 text-center capitalize font-thin ">{title}</h2>
        <h3 className=" text-center  text-18 text-slate-500 dark:text-gray">
          {description}
          {children}
        </h3>
      </div>
    </div>
  );
};

export default OverviewCard;
