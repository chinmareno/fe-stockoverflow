import { LinearProgress } from "@mui/material";

import ChangeAnotherAccountButton from "../../Button/ChangeAnotherAccountButton";
import ManageYourAccountButton from "../../Button/ManageYourAccountButton";
import ToogleThemeButton from "../../Button/ToogleThemeButton";
import ProfilePicture from "../../ProfilePicture";

const MainAccountCard = ({ profile, className, innerColor, hoverColor }) => {
  return (
    <div className={`${className} relative`}>
      <div className="flex">
        <ProfilePicture
          src={profile.image}
          avatarSize={65}
          className="p-4 flex "
          iconPosition="bottom-4 right-4"
          iconSize="medium"
        />
        <div className="mr-auto mt-7">
          {profile.username ? profile.username : "Guest"}
        </div>
      </div>
      <ToogleThemeButton className="absolute top-2 right-2" />
      <ManageYourAccountButton
        className={`py-1 mb-6  rounded-lg px-3 ml-auto mr-auto font-helvetica font-medium border border-white hover:${hoverColor}`}
      />
      <LinearProgress color="primary" />

      <ChangeAnotherAccountButton
        className={`flex pl-6 py-3 gap-4 rounded-b-xl ${innerColor}  hover:${hoverColor}`}
      />
    </div>
  );
};

export default MainAccountCard;
