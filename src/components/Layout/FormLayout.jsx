import { NavLink } from "react-router-dom";
import Logo from "../Logo";

const FormLayout = (props) => {
  const { title, description, navbutton, children, to } = props;

  return (
    <div className="flex flex-col justify-center  items-center border h-auto  px-14  pt-4 pb-10  md:pb-6 md:p-20  bg-palegrey/95 dark:bg-slate-300/95 text-blackepicgame dark:text-hovergooglecard  border-black dark:border-none  rounded-md ">
      <Logo className="text-3xl" />
      <div className=" text-lg md:text-lg mt-2 font-semibold  ">{title}</div>
      {children}
      <div className="flex text-sm  md:text-base items-end mt-1">
        <div className="pt-1  ">{description} </div>
        <NavLink to={to}>
          <div className="text-cyan-600 underline capitalize  hover:text-blue-800">
            {navbutton}
          </div>
        </NavLink>
      </div>
      <NavLink to="/" className="underline mt-1 link">
        back to homepage
      </NavLink>
    </div>
  );
};

export default FormLayout;
