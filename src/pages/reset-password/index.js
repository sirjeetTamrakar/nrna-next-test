import PasswordReset from "@/components/globals/passwordReset";
import { Box } from "@mui/material";
import usestyles from "../styles";

const index = () => {
  const classes = usestyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.wrapper}>
        <PasswordReset />
      </Box>
    </Box>
  );
};

export default index;
