import { Box, Checkbox, InputLabel } from '@mui/material';
import { Controller } from 'react-hook-form';

export const CustomCheckBox = ({
  name,
  control,
  errors,
  title = '',
  disabled = false,
  required,
  styles,
  ...props
}) => {
  let error;
  const splitName = name.split('.');
  if (errors) {
    if (splitName?.length > 1) {
      let loopError = errors;
      // eslint-disable-next-line no-unused-vars
      splitName?.map((item, index) => {
        loopError = loopError?.[item];
      });
      error = loopError?.message;
    } else {
      error = errors?.[name]?.message;
    }
  }

  return (
    <div>
      <Box
        className="custom-checkbox"
        sx={{ display: 'flex', gap: '10px', alignItems: 'center', ...styles }}>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value, ...field } }) => {
            return (
              <Checkbox
                id={name}
                color="secondary"
                onChange={(event) => onChange(event.target.checked)}
                checked={value}
                disabled={disabled}
                disableRipple
                sx={{ p: '0' }}
                {...field}
                {...props}
              />
            );
          }}
        />
        {title && (
          <Box sx={{ display: 'flex', columnGap: '0.1rem', mb: '3px' }}>
            <InputLabel className="title" htmlFor={name}>
              {title}{' '}
            </InputLabel>
            <InputLabel style={{ color: 'red' }}>{required && ' *'}</InputLabel>
          </Box>
        )}
      </Box>
      {error && <Box sx={{ color: 'red', fontSize: '10px', marginTop: '5px' }}>{error}</Box>}
    </div>
  );
};

export const SecondaryCheckbox = ({
  name,
  onChange,
  // value,
  checked,
  disabled,
  ...props
}) => {
  return (
    <Checkbox
      id={name}
      color="secondary"
      onChange={onChange}
      checked={checked}
      disabled={disabled}
      disableRipple
      sx={{ p: '0' }}
      {...props}
    />
  );
};
