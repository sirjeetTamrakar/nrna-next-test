import {
  Autocomplete,
  FormControl,
  FormHelperText,
  InputLabel,
  TextField,
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
export const CustomSearchSelect = ({
  name,
  control,
  errors,
  label,
  data = [],
  title = "",
  disabled,
  defaultValue,
  placeholder,
}) => {
  const classes = useStyles();

  return (
    <div className="inputs">
      <div className={classes.root}>
        {title && (
          <InputLabel className="inputTitle">{title?.toUpperCase()}</InputLabel>
        )}
        <FormControl variant="outlined">
          {/* <InputLabel>{label}</InputLabel> */}
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
              <Autocomplete
                key={value}
                id="combo-box-demo"
                options={data}
                getOptionLabel={(option) => option?.label}
                onChange={(e, data) => onChange(data?.value)}
                defaultValue={data?.find((item) => item?.value === value)}
                isOptionEqualToValue={(option) => option.value}
                disabled={disabled}
                renderInput={(params) => {
                  return (
                    <TextField
                      {...params}
                      variant="outlined"
                      label={label}
                      placeholder={placeholder}
                    />
                  );
                }}
              />
            )}
          />
        </FormControl>
        {errors[name] && errors[name].type === "required" && (
          <FormHelperText style={{ color: "red" }}>
            This field is required
          </FormHelperText>
        )}
      </div>
    </div>
  );
};
