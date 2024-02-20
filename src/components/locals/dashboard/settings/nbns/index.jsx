import { Box, CircularProgress } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from '../../styles';
import { getSiteSettings } from '../redux/actions';
import BasicTabs from './Tabs';

const NBNS = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { get_site_settings_loading } = useSelector((state) => state.settings);
  useEffect(() => {
    const data = { settingable_type: 'nbns', settingable_id: 1 };
    dispatch(getSiteSettings(data));
  }, []);

  return (
    <div className={classes.root}>
      {!get_site_settings_loading ? (
        <BasicTabs />
      ) : (
        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'60vh'}>
          <CircularProgress size={24} />
        </Box>
      )}
    </div>
  );
};

export default NBNS;
