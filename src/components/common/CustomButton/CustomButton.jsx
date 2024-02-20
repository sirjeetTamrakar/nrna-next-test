import SearchIcon from '@mui/icons-material/Search';
import { Box, Button, CircularProgress } from '@mui/material';

const CustomButton = ({
  type,
  variant,
  buttonName,
  loading,
  justifyContent,
  handleClick,
  disabled = false,
  fullWidth = false,
  searchIcon
}) => {
  return (
    <Box display={'flex'} justifyContent={justifyContent || 'end'} marginTop={'17px'}>
      <Button
        variant={variant || 'contained'}
        type={type || 'submit'}
        disabled={loading || disabled}
        fullWidth={fullWidth}
        onClick={handleClick}>
        {loading ? (
          <Box display={'flex'} alignItems={'center'} gap={'10px'}>
            <CircularProgress size={15} />
            {searchIcon && !buttonName ? <SearchIcon /> : buttonName || 'Save'}
          </Box>
        ) : (
          <Box display={'flex'} alignItems={'center'} gap={'10px'}>
            {/* {buttonName || 'Save'} */}
            {searchIcon && !buttonName ? <SearchIcon /> : buttonName || 'Save'}
          </Box>
        )}
      </Button>{' '}
    </Box>
  );
};

export default CustomButton;
