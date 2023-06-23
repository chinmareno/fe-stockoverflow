import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { LinearProgress } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { NavLink } from "react-router-dom";

const MainAccountCard = ({ onClick }) => {
  return (
    <>
      <div className="flex items-start  gap-2">
        <div className="flex relative text-black rounded-full ml-3 mt-3 bg-white border p-3 ">
          <PersonOutlineIcon />
          <NavLink to="/user/edit-account-image" onClick={onClick}>
            <PhotoCameraIcon
              fontSize="small"
              className="absolute bottom-0 right-0"
            />
          </NavLink>
        </div>
        <div className="flex  flex-col">
          <div className="mt-5 mb-8">chinmareno</div>
          <NavLink
            onClick={onClick}
            to="/user/login"
            className="py-1 font-helvetica font-medium border border-hovergooglecard mb-3 hover:bg-hovergooglecard/40 rounded-lg px-3"
          >
            Manage your Account
          </NavLink>
        </div>
      </div>
      <div className="h-1 bg-pink-200 text-white w-full  mt-auto">
        <LinearProgress color="inherit" className="bg-transparent" />
      </div>

      <NavLink
        onClick={onClick}
        to="/user/signup"
        className="rounded-b-3xl gap-5  py-2 flex  hover:bg-hovergooglecard px-7"
      >
        <PersonAddAltOutlinedIcon fontSize="small" />
        <div className=" flex items-center">Add another account</div>
      </NavLink>
    </>
  );
};

export default MainAccountCard;
