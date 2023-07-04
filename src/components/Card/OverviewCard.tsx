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
    <div
      data-aos="zoom-in-up"
      className=" flex flex-col  items-center  justify-start gap-12   rounded-2xl border border-black bg-transparent p-10 text-black brightness-95  dark:border-gray-700  dark:text-white dark:brightness-100 md:flex-row lg:flex-col"
    >
      <img className="h-32 w-32" src={img} />
      <div className="flex w-full flex-col items-center justify-center gap-5">
        <h2 className="text-26 text-center font-mono  font-thin capitalize ">
          {title}
        </h2>
        <h3 className=" text-18 dark:text-gray text-center text-slate-500">
          {description}
          {children}
        </h3>
      </div>
    </div>
  );
};

export default OverviewCard;
