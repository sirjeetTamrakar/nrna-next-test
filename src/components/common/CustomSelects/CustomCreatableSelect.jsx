import { Box, InputLabel } from '@mui/material';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import * as React from 'react';
import { Controller } from 'react-hook-form';
import styles from './style';

const filter = createFilterOptions();

export default function CustomCreatableSelect({
  name,
  control,
  errors,
  label,
  data = [],
  title = '',

  handleOpen = () => {}
}) {
  const classes = styles();
  const [value, setValue] = React.useState(null);
  const [open, toggleOpen] = React.useState(false);

  const handleClose = () => {
    toggleOpen(false);
  };

  return (
    <React.Fragment>
      <Box className="inputs">
        {title && <InputLabel className="inputTitle">{title?.toUpperCase()}</InputLabel>}
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Autocomplete
              value={value}
              onChange={(event, newValue) => {
                if (newValue && newValue.inputValue) {
                  handleOpen(newValue);
                } else {
                  setValue(newValue);
                  onChange(newValue);
                }
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);
                filtered.push({
                  inputValue: params.inputValue ? params.inputValue : 'New',
                  title: `+ Add ${params.inputValue ? params.inputValue : 'New'}`
                });

                if (params.inputValue !== '') {
                }

                return filtered;
              }}
              id="free-solo-dialog-demo"
              options={data}
              getOptionLabel={(option) => {
                // e.g value selected with enter, right from the input
                if (typeof option === 'string') {
                  return option;
                }
                if (option.inputValue) {
                  return option.inputValue;
                }
                return option.title;
              }}
              defaultValue={data?.find((item) => item.title === value?.title)}
              selectOnFocus
              clearOnBlur
              handleHomeEndKeys
              renderOption={(props, option) => {
                return option?.inputValue ? (
                  <li {...props} className={classes.creatableSelectAdd}>
                    {option.title}
                  </li>
                ) : (
                  <li {...props}>{option.title}</li>
                );
              }}
              freeSolo
              renderInput={(params) => <TextField {...params} />}
            />
          )}
        />
      </Box>
    </React.Fragment>
  );
}
