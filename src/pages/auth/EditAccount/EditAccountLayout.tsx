import { NavLink } from "react-router-dom";
import { ReactElement } from "react";
import Logo from "@/components/Logo";
import { FontSize } from "@/components/Button/ChangeAnotherAccountButton";

interface FormLayoutProps {
  title: string;
  to: string;
  children: ReactElement;
  logoSize: FontSize;
}
const EditAccountLayout = (props: FormLayoutProps) => {
  const { title, children, logoSize } = props;

  return (
    <div className="  flex  h-auto flex-col items-center  justify-center  rounded-md border   border-black  bg-white px-14 pb-10 pt-4 dark:border-none md:p-20  md:pb-6 ">
      <Logo iconSize={logoSize} className="text-3xl" />
      <div className=" mt-2 text-lg font-semibold md:text-lg  ">{title}</div>
      {children}
      <NavLink to="/items" className="link mt-1 underline">
        back to homepage
      </NavLink>
    </div>
  );
};

export default EditAccountLayout;
