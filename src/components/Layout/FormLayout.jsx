import { NavLink } from "react-router-dom";
import Logo from "../Logo";

const FormLayout = (props) => {
  const { title, description, navbutton, children, to } = props;

  return (
    <div className="flex flex-col justify-center  items-center border h-auto p-16 md:p-12  bg-palegrey/95 dark:bg-slate-300/95 text-blackepicgame dark:text-hovergooglecard  border-black dark:border-none  rounded-md px-8  pt-4 pb-11 ">
      <div className="my-6 text-3xl md:text-4xl flex">
        <Logo fontSize={24} />
      </div>
      <div className="uppercase text-lg md:text-2xl font-semibold  ">
        {title}
      </div>
      {children}
      <div className="flex text-sm  md:text-base items-end mt-5">
        <div className="pt-1  ">{description} </div>
        <NavLink to={to}>
          <div className="text-cyan-600 underline capitalize  hover:text-blue-800">
            {navbutton}{" "}
          </div>
        </NavLink>
      </div>
      <NavLink to="/" className="underline mt-3 link">
        back to homepage
      </NavLink>
    </div>
  );
};

export default FormLayout;
