import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import { LinearProgress } from "@mui/material";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { NavLink } from "react-router-dom";

const MainGoogleAccountCard = () => {
  return (
    <>
      <div className="bg-cyan-400 w-full flex flex-col justify-between mb-1 rounded-3xl h-full">
        <div className="flex items-start  gap-2">
          <div className="flex relative rounded-full ml-3 mt-3 bg-white border p-3 ">
            <PersonOutlineIcon />
            <NavLink>
              <PhotoCameraIcon
                fontSize="small"
                className="absolute bottom-0 right-0"
              />
            </NavLink>
          </div>
          <div className="flex bg-slate-300 flex-col">
            <div className="mt-5 mb-8">chinmareno</div>
            <div className="py-1 border hover:bg-slate-50 rounded-lg px-3">
              Manage your Account
            </div>
          </div>
        </div>
        <div className="h-1 bg-pink-200 text-white w-full  mt-auto">
          <LinearProgress color="inherit" className="bg-transparent" />
        </div>
        <div className="rounded-b-3xl gap-5  py-2 flex  hover:bg-lime-800 px-7">
          <PersonAddAltOutlinedIcon fontSize="small" />
          <div className="font-semibold flex items-center">
            Add another account
          </div>
        </div>
      </div>
    </>
  );
};

export default MainGoogleAccountCard;
