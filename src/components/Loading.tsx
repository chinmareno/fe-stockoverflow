import BlurScreenWrapper from "./BlurScreenWrapper";
import { Box, LinearProgress } from "@mui/material";

const Loading = () => {
  return (
    <BlurScreenWrapper>
      <Box className="absolute left-0 top-0" sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    </BlurScreenWrapper>
  );
};

export default Loading;
