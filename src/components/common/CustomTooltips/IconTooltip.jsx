import { IconButton, Tooltip } from "@mui/material";
import React from "react";

const IconTooltip = ({ data }) => {
  const { title, icon } = data;
  return (
    <div>
      {" "}
      <Tooltip title={title}>
        <IconButton>{icon}</IconButton>
      </Tooltip>
    </div>
  );
};

export default IconTooltip;
