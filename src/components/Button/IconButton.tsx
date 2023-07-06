import { ReactElement } from "react";
import { NavLink } from "react-router-dom";
import { NavigationMenuLink } from "../ui/navigation-menu";

interface IconButtonProps {
  icon: ReactElement;
  to: string;
  title: string;
  iconClassName?: string;
}
const IconButton = ({ icon, to, title, iconClassName }: IconButtonProps) => {
  return (
    <NavLink className="flex flex-row gap-3 py-2" to={to}>
      <div className={iconClassName}>{icon}</div>
      <div className="text-lg">{title}</div>
    </NavLink>
  );
};

export default IconButton;
