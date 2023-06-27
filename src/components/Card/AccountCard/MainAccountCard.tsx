import { LinearProgress } from "@mui/material";

import ChangeAnotherAccountButton, {
  FontSize,
} from "../../Button/ChangeAnotherAccountButton";
import ManageYourAccountButton from "../../Button/ManageYourAccountButton";
import ToogleThemeButton from "../../Button/ToogleThemeButton";
import ProfilePicture from "../../ProfilePicture";
import IProfile from "@/utils/interface/IProfile";

export interface MainAccountCardProps {
  profile: IProfile;
  className?: string;
  innerColor: string;
  hoverColor?: string;
  iconSize: FontSize;
}

const MainAccountCard = ({
  profile,
  className,
  innerColor,
  hoverColor,
  iconSize,
}: MainAccountCardProps) => {
  const { username, image } = profile;
  return (
    <div className={`${className} relative`}>
      <div className="flex">
        <ProfilePicture
          src={image ? image : ""}
          avatarSize={65}
          className="flex p-4 "
          CameraIconPosition="bottom-4 right-4"
          iconSize="medium"
        />
        <div className="mr-auto mt-7">{username ? username : "Guest"}</div>
      </div>
      <ToogleThemeButton className="absolute right-2 top-2" />
      <ManageYourAccountButton
        className={`mb-6 ml-auto  mr-auto rounded-lg border border-white px-3 py-1 font-helvetica font-medium hover:${hoverColor}`}
      />
      <LinearProgress color="primary" />

      <ChangeAnotherAccountButton
        iconSize={iconSize}
        className={`flex gap-4 rounded-b-xl py-3 pl-6 ${innerColor}  hover:${hoverColor}`}
      />
    </div>
  );
};

export default MainAccountCard;
