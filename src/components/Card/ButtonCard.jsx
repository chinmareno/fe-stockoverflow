import { NavLink } from "react-router-dom";

const ButtonCard = (props) => {
  const { img, title, description, to, button } = props;
  return (
    <div className=" flex flex-col text-black dark:text-white justify-center items-center    m-10 gap-6      ">
      <div className="w-32 flex justify-center items-center h-32">
        <img src={img} />
      </div>
      <h1 className="text-3xl font-medium font-serif text-center ">{title}</h1>

      <NavLink className="bg-lightgrey rounded-md" to={to}>
        <button className="w-52 text-black dark:text-white dark:bg-black text-xs  uppercase font-bold h-13">
          {button}
        </button>
      </NavLink>

      <h3 className="text-sm text-center   ">{description}</h3>
    </div>
  );
};

export default ButtonCard;
