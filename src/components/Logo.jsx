import { Typography } from "@mui/material";
import LayersIcon from "@mui/icons-material/Layers";

const Logo = (props) => {
  const { fontSize } = props;
  return (
    <div className="flex justify-center items-center">
      <LayersIcon fontSize="inherit" />
      <Typography variant="caption" sx={{ fontSize: { fontSize } }}>
        stock<span className="font-semibold">overflow</span>
      </Typography>
    </div>
  );
};

export default Logo;
