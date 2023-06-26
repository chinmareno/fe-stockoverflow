import { NavLink } from "react-router-dom";

const ManageYourAccountButton = ({ className }) => {
  return (
    <NavLink to="/user/login" className={className}>
      Manage your Account
    </NavLink>
  );
};

export default ManageYourAccountButton;
