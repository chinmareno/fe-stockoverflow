import { Typography } from "@mui/material";
import LayersIcon from "@mui/icons-material/Layers";

const Logo = () => {
  return (
    <div className="flex  text-inherit gap-2 justify-center items-center">
      <LayersIcon fontSize="inherit" />
      <Typography variant="caption" fontSize="inherit">
        stock<span className="font-semibold ">overflow</span>
      </Typography>
    </div>
  );
};

export default Logo;
