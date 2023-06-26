import { Typography } from "@mui/material";
import LayersIcon from "@mui/icons-material/Layers";

const Logo = ({ className, fontSize = "inherit" }) => {
  return (
    <div className={`${className} flex items-center`}>
      <LayersIcon fontSize={fontSize} />
      <div fontSize={fontSize}>
        stock<span className="font-semibold ">overflow</span>
      </div>
    </div>
  );
};

export default Logo;
