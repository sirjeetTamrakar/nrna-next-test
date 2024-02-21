import CompleteRegistration from "@/components/globals/completeRegistration";
import { Box } from "@mui/material";
import usestyles from "../styles";

const index = () => {
  const classes = usestyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.wrapper}>
        <CompleteRegistration />
      </Box>
    </Box>
  );
};

export default index;
