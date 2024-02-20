import { Box, FormHelperText, Switch, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Controller } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiFormControl-root': {
      width: '100%'
    }
  }
}));

export const CustomSwitch = ({
  name,
  control,
  errors,
  label,
  data = [],

  defaultValue,
  rule = { required: false },
  title = '',
  disabled = false,
  nonNestedSelect = true
}) => {
  return (
    <>
      <div>
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <Box alignItems={'start'} display="flex" sx={{ gap: '10px', alignItems: 'center' }}>
              <Switch checked={value} onChange={onChange} />
              <Typography>{label}</Typography>
            </Box>
          )}
          rules={rule}
        />
        {nonNestedSelect && errors[name] && errors[name].type === 'required' && (
          <FormHelperText style={{ color: 'red' }}>This field is required</FormHelperText>
        )}
      </div>
    </>
  );
};
