import { CloudOff } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(3),
    background: "#f6f6f6",
    //  background: theme.palette.background.light,
    borderRadius: theme.spacing(1),
    height: "100%",
  },
  icon: {
    marginBottom: theme.spacing(2),
    //  color: theme.palette.error.main,
    "& svg": {
      fontSize: "6rem",
      color: "#bbb",
    },
  },
  text: {
    textAlign: "center",
  },
}));

const DataNotFound = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.icon}>
        <CloudOff />
      </Box>

      <Typography variant="body1" className={classes.text}>
        Data Not Found
      </Typography>
    </Box>
  );
};

export default DataNotFound;
