import { NavLink } from "react-router-dom";

const FooterAccountCard = ({ onClick }) => {
  return (
    <>
      <NavLink
        onClick={onClick}
        target="_blank"
        to="/privacy-policy"
        className="hover:bg-hovergooglecard rounded-md   px-2"
      >
        Privacy Policy
      </NavLink>
      <div className="py-1">•</div>
      <NavLink
        target="_blank"
        onClick={onClick}
        to="/terms-of-service"
        className="hover:bg-hovergooglecard rounded-md   px-2"
      >
        Terms of Service
      </NavLink>
    </>
  );
};

export default FooterAccountCard;
