import DescriptionIcon from '@mui/icons-material/Description';
import GroupsIcon from '@mui/icons-material/Groups';
import SettingsIcon from '@mui/icons-material/Settings';
import { Box } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import About from './About';
import Form from './Form';
import Services from './Services';

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

const BusinessTabs = ({ singleBusinessData }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab icon={<SettingsIcon />} iconPosition="start" label="Services" {...a11yProps(0)} />
          <Tab icon={<GroupsIcon />} iconPosition="start" label="About Us" {...a11yProps(1)} />
          <Tab
            icon={<DescriptionIcon />}
            iconPosition="start"
            label="Contact Us"
            {...a11yProps(2)}
          />
        </Tabs>
      </Box>
      <Box sx={{ backgroundColor: '#F9F9FB', marginTop: '20px' }}>
        <CustomTabPanel value={value} index={0}>
          <Services />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <About singleBusinessData={singleBusinessData} />
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          <Form singleBusinessData={singleBusinessData} />
        </CustomTabPanel>
      </Box>
    </Box>
  );
};

export default BusinessTabs;
