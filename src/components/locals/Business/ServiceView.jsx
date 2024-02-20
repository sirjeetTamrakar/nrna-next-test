import { Box } from '@mui/material';
import { useStyles } from './styles';

const ServiceView = ({ item }) => {
  const classes = useStyles();
  return (
    <Box className={classes.serviceRoot}>
      <p dangerouslySetInnerHTML={{ __html: item?.description }}></p>
    </Box>
  );
};

export default ServiceView;
