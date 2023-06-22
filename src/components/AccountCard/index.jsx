import { NavLink } from "react-router-dom";
import FooterAccountCard from "./FooterAccountCard";
import MainAccountCard from "./MainAccountCard";
import SignOutAccountCard from "./SignoutAccountCard";

const AccountCard = ({ onClick }) => {
  return (
    <div className="bg-outergooglecard text-white pt-2 px-3 pb-4 rounded-sm w-full text-sm h-full flex">
      <div className=" bg-innergooglecard    flex flex-col justify-between items-center rounded-3xl w-full h-full">
        <div className="bg-maingooglecard w-72 h-full   flex flex-col mt-1  mb-1 rounded-3xl ">
          <MainAccountCard onClick={onClick} />
        </div>
        <NavLink
          onClick={onClick}
          to="/user/login"
          className="flex pl-7 mt-auto w-full border-b  py-2 gap-5 hover:bg-hovergooglecard "
        >
          <SignOutAccountCard onClick={onClick} />
        </NavLink>
        <div className="flex pt-1  items-center font-light text-xs gap-1 w-full   justify-center ">
          <FooterAccountCard onClick={onClick} />
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
