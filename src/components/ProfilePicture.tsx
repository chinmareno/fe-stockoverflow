import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { NavLink } from "react-router-dom";
import { FontSize } from "./Button/ChangeAnotherAccountButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfilePictureProps {
  CameraIconPosition: string;
  image: string;
  className?: string;
  iconSize: FontSize;
  username: string;
}
const ProfilePicture = ({
  CameraIconPosition,
  image,
  username,
  className,
  iconSize,
}: ProfilePictureProps) => {
  return (
    <div className={`${className} relative `}>
      <Avatar className="mr-auto ">
        <AvatarImage src={image} />
        <AvatarFallback className="text-black dark:text-white">
          {username}
        </AvatarFallback>
      </Avatar>
      <NavLink className={`absolute ${CameraIconPosition}`} to="/user/login">
        <PhotoCameraIcon fontSize={iconSize} />
      </NavLink>
    </div>
  );
};

export default ProfilePicture;
