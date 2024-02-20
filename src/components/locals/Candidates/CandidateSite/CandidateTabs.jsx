import GroupsIcon from '@mui/icons-material/Groups';
import WorkIcon from '@mui/icons-material/Work';
import { Box } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import About from './About';
import Business from './Business';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const CandidateTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab icon={<GroupsIcon />} iconPosition="start" label="About Us" {...a11yProps(0)} />
          <Tab icon={<WorkIcon />} iconPosition="start" label="Business" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <Box sx={{ backgroundColor: '#F9F9FB', marginTop: '20px' }}>
        <CustomTabPanel value={value} index={1}>
          <Business />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={0}>
          <About />
        </CustomTabPanel>
      </Box>
    </Box>
  );
};

export default CandidateTabs;
