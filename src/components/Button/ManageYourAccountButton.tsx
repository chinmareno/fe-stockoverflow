import { NavLink } from "react-router-dom";

interface ManageYourAccountButtonProps {
  className?: string;
}

const ManageYourAccountButton = ({
  className,
}: ManageYourAccountButtonProps) => {
  return (
    <div>
      <NavLink to="/user/edit-account" className={className}>
        Manage your Account
      </NavLink>
    </div>
  );
};

export default ManageYourAccountButton;
