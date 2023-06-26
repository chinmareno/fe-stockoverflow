import { NavLink } from "react-router-dom";

const FooterAccountCard = ({ onClick }) => {
  return (
    <>
      <button
        onClick={onClick}
        className="hover:bg-hovergooglecard rounded-md   px-2"
      >
        Privacy Policy
      </button>
      <div className="py-1">•</div>
      <button
        onClick={onClick}
        className="hover:bg-hovergooglecard rounded-md   px-2"
      >
        Terms of Service
      </button>
    </>
  );
};

export default FooterAccountCard;
