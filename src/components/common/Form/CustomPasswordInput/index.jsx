/* Third party libraries */

/* Third party libraries */
import { Report, VisibilityOffOutlined, VisibilityOutlined } from '@mui/icons-material';
import {
  IconButton,
  InputAdornment,
  InputLabel,
  Skeleton,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

const useStyles = makeStyles((theme) => ({
  inputField: {
    border: '1px solid gray !important',
    borderRadius: '4px'
  }
}));

const CustomPasswordInput = ({
  name,
  label,
  placeholder = '',
  icon = '',
  tooltipLabel = '',
  loading = false,
  multiple = false,
  defaultValue,
  disabled,
  inputProps = {}
}) => {
  const classes = useStyles();
  const {
    control,
    formState: { errors }
  } = useFormContext();
  const fieldError = errors[name]?.message;
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Box>
      <Box display="flex" alignItems="center" columnGap={0.5}>
        <InputLabel>{label}</InputLabel>
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
              value={defaultValue || value}
              InputLabelProps={{ shrink: false }}
              placeholder={placeholder}
              error={fieldError ? true : false}
              disabled={disabled}
              helperText={fieldError}
              inputProps={inputProps}
              type={showPassword ? 'text' : 'password'}
              onWheel={(e) => e.target.blur()}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end">
                      {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          )}
        />
      )}
    </Box>
  );
};

export default CustomPasswordInput;
