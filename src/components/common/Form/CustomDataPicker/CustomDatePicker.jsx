import { Box, FormHelperText, InputLabel } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';
import { Controller } from 'react-hook-form';

const CustomDatePicker = ({
  label,
  name,
  control,
  errors,
  classnames = '',
  disablePast,
  disableFuture,
  disabled,
  minDate,
  maxDate,
  format,
  ...props
}) => {
  return (
    <Box className={`${classnames} datepicker`}>
      <Controller
        control={control}
        errors={errors}
        name={name}
        render={({ field }) => (
          <>
            {label && (
              <InputLabel htmlFor={name} sx={{ marginBottom: '3px' }}>
                {label}
              </InputLabel>
            )}
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                sx={{ width: '100%', border: '1px solid gray', borderRadius: '4px' }}
                {...field}
                id={name}
                value={field.value ? dayjs(field.value) : ''}
                onChange={(date) => {
                  field.onChange(format ? date.format(format) : date.format('YYYY-MM-DD'));
                }}
                disableFuture={disableFuture ? true : false}
                disablePast={disablePast ? true : false}
                minDate={minDate ? dayjs(minDate) : undefined}
                maxDate={maxDate ? dayjs(maxDate) : undefined}
                disabled={disabled}
                // open={true}
                // dayOfWeekFormatter={(day) => day}
              />
            </LocalizationProvider>
          </>
        )}></Controller>

      {errors?.message && (
        <FormHelperText
          error={true}
          sx={{
            color: 'red !important',
            fontSize: '10px',
            marginTop: '5px'
          }}>
          {errors?.message}
        </FormHelperText>
      )}
    </Box>
  );
};

export default CustomDatePicker;
