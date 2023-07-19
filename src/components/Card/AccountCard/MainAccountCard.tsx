import { Box, LinearProgress } from "@mui/material";

import ChangeAnotherAccountButton, {
  FontSize,
} from "../../Button/ChangeAnotherAccountButton";
import ManageYourAccountButton from "../../Button/ManageYourAccountButton";
import ToogleThemeButton from "../../Button/ToogleThemeButton";
import ProfilePicture from "../../ProfilePicture";
import { IProfile } from "@/hooks/useProfileQuery";
import useThemeStoreItems from "@/store/useThemeStoreitems";

export interface MainAccountCardProps {
  profile: IProfile;
  className?: string;
  innerColor: string;
  hoverColor: string;
  iconSize: FontSize;
  cameraIconPosition: string;
  cameraIconSize: FontSize;
  theme: "dark" | "light";
}

const MainAccountCard = ({
  profile,
  className,
  innerColor,
  hoverColor,
  iconSize,
  cameraIconPosition,
  cameraIconSize,
  theme,
}: MainAccountCardProps) => {
  const { username, image } = profile;
  const { setTheme } = useThemeStoreItems();

  return (
    <div className={`${className} absolute`}>
      <div className="flex">
        <ProfilePicture
          image={image}
          username={username}
          className="flex p-4 "
          CameraIconPosition={cameraIconPosition}
          iconSize={cameraIconSize}
        />
        <div className="mr-auto mt-7">{username ? username : "Guest"}</div>
      </div>
      <ToogleThemeButton
        setTheme={setTheme}
        theme={theme}
        className="absolute right-2 top-2"
      />
      <ManageYourAccountButton
        className={`font-helvetica mb-12  ml-3 mr-auto rounded-lg border border-white px-3 py-1 font-medium ${hoverColor}`}
      />
      <ChangeAnotherAccountButton
        iconSize={iconSize}
        className={`mt-4 flex gap-4 rounded-b-xl py-3 pl-6 ${innerColor}  ${hoverColor}`}
      />
    </div>
  );
};

export default MainAccountCard;
