import { NavLink } from "react-router-dom";
import Logo from "../Logo";
import { FontSize } from "../Button/ChangeAnotherAccountButton";
import { ReactElement } from "react";
import { Box, LinearProgress } from "@mui/material";

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
    <div className="relative flex  h-auto flex-col items-center  justify-center  rounded-md border   border-black  bg-white px-14 pb-6 pt-4 dark:border-none md:p-20  md:pb-2 ">
      <Logo iconSize={logoSize} className="text-3xl" />
      <div className=" mt-2 text-lg font-semibold md:text-lg  ">{title}</div>
      {children}
      <div className="mt-1 flex items-end text-sm text-gray-500 md:text-base">
        <div className="pt-1  ">{bottomDescription} </div>
        <NavLink to={to}>
          <div className="capitalize text-cyan-600   hover:text-blue-800">
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
