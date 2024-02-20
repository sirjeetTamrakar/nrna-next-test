import {
  Autocomplete,
  Box,
  FormControl,
  FormHelperText,
  InputLabel,
  TextField
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Controller } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%'
    }
  }
}));
export const CustomGroupSearchSelect = ({
  name,
  control,
  errors,
  label,
  // data = [],
  title = '',
  disabled,
  defaultValue,
  placeholder
}) => {
  const classes = useStyles();
  const data = [
    {
      title: 'abcd',
      children: [
        {
          title: '2',
          children: [{ title: '3' }, { title: '2123' }]
        }
      ]
    },
    {
      title: '1000',
      children: [
        {
          title: '23',
          children: [{ title: '3' }]
        }
      ]
    }
  ];

  const renderGroupRecursively = (props, option) => {
    return (
      <li key={option?.title}>
        <Box {...props} key={option?.title}>
          {option?.title}
        </Box>
        <Box ml={2}>
          {option?.children &&
            option.children.map((child, index) => (
              <Box {...props} id={`combo-box-demo-option-100`} key={index}>
                {renderGroupRecursively({ ...props, id: `combo-box-demo-option-100` }, child)}
              </Box>
            ))}
        </Box>
      </li>
    );
  };

  return (
    <div className="inputs">
      <div className={classes.root}>
        {title && <InputLabel className="inputTitle">{title?.toUpperCase()}</InputLabel>}
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
                // getOptionLabel={(option) => option?.title}
                renderOption={function newFunction(props, option) {
                  return (
                    <li key={option?.title}>
                      <Box {...props} key={option?.title}>
                        {option?.title}
                      </Box>
                      <Box ml={2}>
                        {option?.children &&
                          option.children.map((child, index) => (
                            <Box {...props} id={'combo-box-demo-option-2'} key={index}>
                              {newFunction(props, child)}
                            </Box>
                          ))}
                      </Box>
                    </li>
                  );
                }}
                onChange={(e, data) => onChange(data?.value)}
                defaultValue={data?.find((item) => item.value == value)}
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
        {errors[name] && errors[name].type === 'required' && (
          <FormHelperText style={{ color: 'red' }}>This field is required</FormHelperText>
        )}
      </div>
    </div>
  );
};
