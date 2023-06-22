import { NavLink } from "react-router-dom";

const FooterAccountCard = ({ onClick }) => {
  return (
    <>
      <NavLink
        onClick={onClick}
        to="/user/login"
        className="hover:bg-hovergooglecard rounded-md   px-2"
      >
        Privacy Policy
      </NavLink>
      <div className="py-1">•</div>
      <NavLink
        onClick={onClick}
        to="/user/login"
        className="hover:bg-hovergooglecard rounded-md   px-2"
      >
        Terms of Service
      </NavLink>
    </>
  );
};

export default FooterAccountCard;
