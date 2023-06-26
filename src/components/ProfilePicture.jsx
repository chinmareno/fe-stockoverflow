import { Avatar } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { NavLink } from "react-router-dom";

const ProfilePicture = ({
  iconPosition,
  avatarSize,
  src,
  className,
  iconSize,
}) => {
  return (
    <div className={`${className} relative`}>
      <Avatar
        sx={{ width: avatarSize, height: avatarSize }}
        src={src ? src : ""}
      />
      <NavLink className={`absolute ${iconPosition}`} to="/user/login">
        <PhotoCameraIcon fontSize={iconSize} />
      </NavLink>
    </div>
  );
};

export default ProfilePicture;
