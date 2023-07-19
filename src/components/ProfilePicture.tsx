import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { NavLink } from "react-router-dom";
import { FontSize } from "./Button/ChangeAnotherAccountButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfilePictureProps {
  image: string;
  className?: string;
  iconSize: FontSize;
  username: string;
}
const ProfilePicture = ({
  image,
  username,
  className,
  iconSize,
}: ProfilePictureProps) => {
  const avatarFallBack = username.substring(0, 5);

  return (
    <div className={`${className} relative `}>
      <Avatar className="mr-auto ">
        <AvatarImage src={import.meta.env.VITE_SERVER_URL + "/" + image} />
        <AvatarFallback className="bg-inherit text-white ">
          {avatarFallBack}
        </AvatarFallback>
      </Avatar>
      <NavLink to="/user/edit-account-image">
        <PhotoCameraIcon fontSize={iconSize} />
      </NavLink>
    </div>
  );
};

export default ProfilePicture;
