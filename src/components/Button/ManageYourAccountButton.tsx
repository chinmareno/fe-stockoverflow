import { NavLink } from "react-router-dom";

interface ManageYourAccountButtonProps {
  className?: string;
}

const ManageYourAccountButton = ({
  className,
}: ManageYourAccountButtonProps) => {
  return (
    <NavLink to="/user/login" className={className}>
      Manage your Account
    </NavLink>
  );
};

export default ManageYourAccountButton;
