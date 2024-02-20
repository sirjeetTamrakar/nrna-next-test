/* Third party libraries */

/* Third party libraries */
import { Report } from '@mui/icons-material';
import { Autocomplete, Box, InputLabel, TextField, Tooltip, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Controller, useFormContext } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  inputField: {
    '& .MuiOutlinedInput-root': {
      border: '1px solid gray',
      borderRadius: '4px'
    },
    '& .MuiAutocomplete-endAdornment': {
      top: 'calc(50% - 10px)'
    }
  }
}));

const CustomAutoComplete = ({
  name,
  label,
  placeholder = '',
  type = 'text',
  icon = '',
  options = [],
  tooltipLabel = '',
  disabled = false,
  required,
  onCountrySelection,
  phoneSelect,
  onInputChange
}) => {
  const {
    control,
    watch,
    formState: { errors }
  } = useFormContext();
  const classes = useStyles();
  const watchValue = watch(name);
  const defaultValue = options?.filter((item) => item.value == watchValue);
  const fieldError = errors[name]?.message;
  return (
    <Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        columnGap={0.5}
        sx={{ paddingBottom: '0px' }}>
        <InputLabel>
          {label}
          {required && <span style={{ color: 'red' }}> * </span>}
        </InputLabel>
        {tooltipLabel && (
          <Tooltip title={<Typography variant="h6">{tooltipLabel}</Typography>}>
            <Report sx={{ color: '#9D9CAF', cursor: 'pointer' }} />
          </Tooltip>
        )}
      </Box>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => (
          <Autocomplete
            id="combo-box-demo"
            sx={{ fontSize: '14px !important' }}
            options={options}
            disabled={disabled}
            defaultValue={defaultValue ? defaultValue[0] : null}
            className={classes.autoCompleteField}
            isOptionEqualToValue={(option) => option.value}
            getOptionLabel={(option) => option.label}
            // onChange={(e, data) => onChange(data?.value)}
            onChange={(e, data) => {
              // if (!phoneSelect) {
              onChange(data?.value);
              // }

              // if (phoneSelect) {
              //   onCountrySelection(data?.code); // Pass the selected country label
              // }
            }}
            renderInput={(params) => (
              <TextField
                className={classes.inputField}
                error={fieldError ? true : false}
                {...params}
                value={value}
                helperText={fieldError}
              />
            )}
          />
        )}
      />
    </Box>
  );
};

export default CustomAutoComplete;
