import { FormControl, FormHelperText, InputLabel, Select } from "@mui/material";
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

export const CustomGroupSelect = ({
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
                native
              >
                {data?.map((group, index) => (
                  <React.Fragment key={index}>
                    <optgroup label={group.groupName}>
                      {group.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </optgroup>
                  </React.Fragment>
                ))}
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
