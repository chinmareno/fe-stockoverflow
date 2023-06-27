import LayersIcon from "@mui/icons-material/Layers";
import { FontSize } from "./Button/ChangeAnotherAccountButton";

interface LogoProps {
  className?: string;
  iconSize: FontSize;
}
const Logo = ({ className, iconSize }: LogoProps) => {
  return (
    <div className={`${className} flex items-center`}>
      <LayersIcon fontSize={iconSize} />
      <div>
        stock<span className="font-semibold ">overflow</span>
      </div>
    </div>
  );
};

export default Logo;
