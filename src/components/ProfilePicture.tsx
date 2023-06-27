import { Avatar } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { NavLink } from "react-router-dom";
import { FontSize } from "./Button/ChangeAnotherAccountButton";

interface ProfilePictureProps {
  CameraIconPosition: string;
  avatarSize: number;
  src: string;
  className?: string;
  iconSize: FontSize;
}
const ProfilePicture = ({
  CameraIconPosition,
  avatarSize,
  src,
  className,
  iconSize,
}: ProfilePictureProps) => {
  return (
    <div className={`${className} relative`}>
      <Avatar
        sx={{ width: avatarSize, height: avatarSize }}
        src={src ? src : ""}
      />
      <NavLink className={`absolute ${CameraIconPosition}`} to="/user/login">
        <PhotoCameraIcon fontSize={iconSize} />
      </NavLink>
    </div>
  );
};

export default ProfilePicture;
