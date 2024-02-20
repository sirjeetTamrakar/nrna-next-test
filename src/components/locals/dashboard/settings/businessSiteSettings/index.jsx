import { Roles } from 'constants/RoleConstant';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from '../../styles';
import { getSiteSettings } from '../redux/actions';
import BasicTabs from './Tabs';

const BusinessSiteSettings = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    let typeData;
    if (user) {
      if (user?.role_name == Roles?.NCC) {
        typeData = { settingable_type: user?.role_name, settingable_id: user?.id };
      }
      dispatch(getSiteSettings(typeData));
    }
  }, [user]);
  return (
    <div className={classes.root}>
      <BasicTabs />
    </div>
  );
};

export default BusinessSiteSettings;
