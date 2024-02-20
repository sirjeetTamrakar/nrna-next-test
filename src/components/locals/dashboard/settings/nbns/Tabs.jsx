import { Box } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import * as React from 'react';
import About from './about';
import Advice from './advice';
import NBNSGallery from './nbnsGallery';
import NbnsHomeData from './nbnsHomeData';
import SettingsData from './settingsData';
import Support from './support';
import Survey from './survey';

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

const BasicTabs = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Settings Data" {...a11yProps(0)} />
          <Tab label="About" {...a11yProps(1)} />
          <Tab label="Survey" {...a11yProps(2)} />
          <Tab label="Advice" {...a11yProps(3)} />
          <Tab label="Support" {...a11yProps(4)} />
          <Tab label="Gallery" {...a11yProps(5)} />
          <Tab label="Home Data" {...a11yProps(6)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <SettingsData />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <About />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Survey />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Advice />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={4}>
        <Support />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={5}>
        <NBNSGallery />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={6}>
        <NbnsHomeData />
      </CustomTabPanel>
    </Box>
  );
};

export default BasicTabs;
