import { ReactNode } from "react";

interface OverviewCardProps {
  img: string;
  title: string;
  description: string;
  children?: ReactNode;
}

const OverviewCard = (props: OverviewCardProps) => {
  const { img, title, description, children } = props;
  return (
    <div className="   flex  flex-col items-center   justify-start gap-12 rounded-2xl border border-black bg-transparent p-10 text-black  brightness-95 dark:border-darkgrey  dark:text-white dark:brightness-100 md:flex-row lg:flex-col">
      <img className="h-32 w-32" src={img} />
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <h2 className="text-center font-mono text-26  font-thin capitalize ">
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
