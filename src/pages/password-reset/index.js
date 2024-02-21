import ChangePassword from "@/components/globals/changePassword";
import { Box } from "@mui/material";
import usestyles from "../styles";

const index = () => {
  const classes = usestyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.wrapper}>
        <ChangePassword />
      </Box>
    </Box>
  );
};

export default index;
