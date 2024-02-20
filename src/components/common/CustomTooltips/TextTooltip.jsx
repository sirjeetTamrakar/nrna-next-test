import { Tooltip } from "@mui/material";
import React from "react";

const TextTooltip = ({ data, textComponent }) => {
  const { title } = data;
  return (
    <div>
      {" "}
      <Tooltip title={title}>{textComponent}</Tooltip>
    </div>
  );
};

export default TextTooltip;
