import { Button } from "@mui/material";
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
    <div className=" m-10 flex flex-col items-center justify-center  gap-6 text-black dark:text-white      ">
      <div className="flex h-32 w-32 items-center justify-center">
        <img src={img} />
      </div>
      <h1 className="font-serif text-center text-3xl font-medium ">{title}</h1>

      <NavLink className="bg-lightgrey rounded-md" to={to}>
        <Button
          variant="contained"
          className="h-13 w-52  text-xs font-bold uppercase  text-white dark:bg-black dark:text-white"
        >
          {buttonTitle}
        </Button>
      </NavLink>

      <h3 className="text-center text-sm font-semibold   ">{description}</h3>
    </div>
  );
};

export default ButtonCard;
