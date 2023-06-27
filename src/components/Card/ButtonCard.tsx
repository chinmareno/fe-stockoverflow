import { NavLink } from "react-router-dom";

interface ButtonCardProps {
  img: string;
  title: string;
  description: string;
  to: string;
  buttonTitle: string;
}
const ButtonCard = (props: ButtonCardProps) => {
  const { img, title, description, to, buttonTitle } = props;
  return (
    <div className=" m-10 flex flex-col items-center justify-center gap-6    text-black dark:text-white      ">
      <div className="flex h-32 w-32 items-center justify-center">
        <img src={img} />
      </div>
      <h1 className="text-center font-serif text-3xl font-medium ">{title}</h1>

      <NavLink className="rounded-md bg-lightgrey" to={to}>
        <button className="h-13 w-52 text-xs font-bold uppercase  text-black dark:bg-black dark:text-white">
          {buttonTitle}
        </button>
      </NavLink>

      <h3 className="text-center text-sm   ">{description}</h3>
    </div>
  );
};

export default ButtonCard;
