/* Third party libraries */

/* Third party libraries */
import { Report } from '@mui/icons-material';
import { InputLabel, Skeleton, TextField, Tooltip, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { Controller, useFormContext } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  inputField: {
    '& .MuiOutlinedInput-input': {
      border: '1px solid gray',
      borderRadius: '4px'
    }
  }
}));

const CustomInput = ({
  name,
  label,
  placeholder = '',
  type = 'text',
  icon = '',
  tooltipLabel = '',
  loading = false,
  multiline = false,
  defaultValue,
  disabled,
  inputProps = {},
  required,
  rows = 1,
  data = [],
  select = ''
}) => {
  const classes = useStyles();
  const {
    control,
    formState: { errors }
  } = useFormContext();
  const fieldError = errors[name]?.message;
  const styles = {
    menuItems: {
      color: '#999999',
      fontSize: {
        xs: '15px !important',
        md: '13px !important'
      }
    }
  };
  return (
    <Box>
      <Box display="flex" alignItems="center" columnGap={0.5}>
        <InputLabel>
          {label} {required && <span style={{ color: 'red' }}>*</span>}
        </InputLabel>
        {tooltipLabel && (
          <Tooltip title={<Typography variant="body1">{tooltipLabel}</Typography>}>
            <Report sx={{ color: '#9D9CAF' }} />
          </Tooltip>
        )}
      </Box>
      {loading ? (
        <Skeleton variant="rectangular" height={31} animation="wave" />
      ) : (
        <Controller
          name={name}
          control={control}
          render={({ field: { onChange, value } }) => (
            <TextField
              className={classes.inputField}
              sx={{ width: '100%' }}
              onChange={onChange}
              multiline={multiline}
              rows={rows}
              value={(value || defaultValue) ?? ''}
              InputLabelProps={{ shrink: false }}
              placeholder={placeholder}
              error={fieldError ? true : false}
              disabled={disabled}
              helperText={fieldError}
              InputProps={inputProps}
              // InputProps={{
              //   inputProps: { min: '2023-09-21' }
              // }}
              type={type}
              select={select}
              onWheel={(e) => e.target.blur()}>
              {data?.map((option) => (
                <MenuItem
                  sx={styles.menuItems}
                  key={option?.value || option?.id}
                  value={option?.value || option?.id}>
                  {option?.label || option.table_readable_name}
                </MenuItem>
              ))}
            </TextField>
          )}
        />
      )}
    </Box>
  );
};

export default CustomInput;
