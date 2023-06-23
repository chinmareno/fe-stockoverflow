const OverviewCard = (props) => {
  const { img, title, description, children } = props;
  return (
    <div className="   flex  brightness-95 dark:brightness-100   flex-col md:flex-row lg:flex-col dark:text-white text-black justify-start items-center p-10  gap-12 border  rounded-2xl dark:border-darkgrey bg-transparent border-black">
      <img className="w-32 h-32" src={img} />
      <div className="flex w-full flex-col justify-center items-center gap-5">
        <h2 className="text-26 text-center font-mono  capitalize font-thin ">
          {title}
        </h2>
        <h3 className=" text-center text-18 text-slate-500 dark:text-gray">
          {description}
          {children}
        </h3>
      </div>
    </div>
  );
};

export default OverviewCard;
