import { Box } from '@mui/material';
import CustomButton from '../CustomButton/CustomButton';
import styles from './style';

const ModalFooter = () => {
  const classes = styles();
  return (
    <Box className={classes.root}>
      <CustomButton buttonName="Save"></CustomButton>
      <CustomButton buttonName="Cancel"></CustomButton>
    </Box>
  );
};

export default ModalFooter;
