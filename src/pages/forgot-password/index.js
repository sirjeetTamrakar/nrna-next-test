import ForgotPassword from "@/components/globals/forgotPassword";
import { Box } from "@mui/material";
import usestyles from "../styles";

const index = () => {
  const classes = usestyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.wrapper}>
        <ForgotPassword />
      </Box>
    </Box>
  );
};

export default index;
