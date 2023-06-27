import { NavLink } from "react-router-dom";
import Logo from "../Logo";
import { FontSize } from "../Button/ChangeAnotherAccountButton";
import { ReactElement } from "react";

interface FormLayoutProps {
  title: string;
  bottomDescription: string;
  linkTitle: string;
  to: string;
  children: ReactElement;
  logoSize: FontSize;
}
const FormLayout = (props: FormLayoutProps) => {
  const { title, bottomDescription, linkTitle, children, to, logoSize } = props;

  return (
    <div className="flex h-auto flex-col  items-center justify-center rounded-md  border  border-black bg-palegrey/95  px-14 pb-10  pt-4 text-blackepicgame dark:border-none dark:bg-slate-300/95  dark:text-hovergooglecard md:p-20  md:pb-6 ">
      <Logo iconSize={logoSize} className="text-3xl" />
      <div className=" mt-2 text-lg font-semibold md:text-lg  ">{title}</div>
      {children}
      <div className="mt-1 flex  items-end text-sm md:text-base">
        <div className="pt-1  ">{bottomDescription} </div>
        <NavLink to={to}>
          <div className="capitalize text-cyan-600 underline  hover:text-blue-800">
            {linkTitle}
          </div>
        </NavLink>
      </div>
      <NavLink to="/" className="link mt-1 underline">
        back to homepage
      </NavLink>
    </div>
  );
};

export default FormLayout;
