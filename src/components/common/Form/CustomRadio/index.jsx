/* Third party libraries */

/* Third party libraries */
import { Report } from '@mui/icons-material';
import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  InputLabel,
  Radio,
  RadioGroup,
  Skeleton,
  Tooltip,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { Controller, useFormContext } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  inputField: {
    '& .MuiOutlinedInput-input': {
      background: '#fff'
    }
  },
  error: {
    color: '#FF3B3B !important'
  }
}));

const CustomRadio = ({
  name,
  label,
  placeholder = '',
  type = 'text',
  icon = '',
  tooltipLabel = '',
  options,
  loading = false
}) => {
  const classes = useStyles();
  const {
    control,
    formState: { errors }
  } = useFormContext();
  const fieldError = errors[name]?.message;
  return (
    <Box>
      <Box display="flex" alignItems="center" columnGap={0.5} sx={{ paddingBottom: '4px' }}>
        <InputLabel>{label}</InputLabel>
        {tooltipLabel && (
          <Tooltip title={<Typography variant="body1">{tooltipLabel}</Typography>}>
            <Report sx={{ color: '#9D9CAF' }} />
          </Tooltip>
        )}
      </Box>
      {loading ? (
        <Skeleton variant="rectangular" height={30} animation="wave" />
      ) : (
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                onChange={onChange}
                value={value}>
                {options?.map((item, index) => (
                  <FormControlLabel
                    value={item?.value}
                    control={<Radio />}
                    label={item?.label}
                    key={index}
                  />
                ))}
                {fieldError && (
                  <FormHelperText className={classes.error}>{fieldError}</FormHelperText>
                )}
              </RadioGroup>
            </FormControl>
          )}
        />
      )}
    </Box>
  );
};

export default CustomRadio;
