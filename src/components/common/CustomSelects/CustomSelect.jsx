import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { Controller } from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "100%",
    },
  },
}));

export const CustomSelect = ({
  name,
  control,
  errors,
  label,
  data = [],

  defaultValue,
  rule = { required: false },
  title = "",
  disabled = false,
  nonNestedSelect = true,
}) => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.root}>
        {title && (
          <InputLabel className="title">{title?.toUpperCase()}</InputLabel>
        )}

        <FormControl variant="outlined">
          <InputLabel>{label}</InputLabel>

          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Select
                label={name}
                onChange={onChange}
                value={value}
                disabled={disabled}
                fullWidth
                defaultValue={defaultValue || ""}
              >
                {data?.length ? (
                  data?.map((item) => {
                    const value = item?.value;
                    const label = item?.label;
                    return (
                      <MenuItem value={value} disabled={item?.disabled}>
                        {label}
                      </MenuItem>
                    );
                  })
                ) : (
                  <MenuItem value={""} disabled>
                    No options
                  </MenuItem>
                )}
              </Select>
            )}
            rules={rule}
          />
        </FormControl>
        {nonNestedSelect &&
          errors[name] &&
          errors[name].type === "required" && (
            <FormHelperText style={{ color: "red" }}>
              This field is required
            </FormHelperText>
          )}
      </div>
    </>
  );
};
