import { Box, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useStyles } from './styles';

const BusinessNav = ({ category, selected, setSelected, setSearch }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const checkActive = (slug) => {
    if (selected) {
      if (slug === selected) {
        return 'active';
      } else return '';
    } else if (slug === category?.[0]?.value) {
      return 'active';
    } else {
      return '';
    }
  };

  const handleSetSelected = (slug) => {
    setSelected(slug);

    slug !== 'home' && navigate(`/nrna/business/${slug}`, { state: slug });
    slug === 'home' && navigate(`/nrna/business`, { state: slug });
  };
  return (
    <Box className={classes.root}>
      <Container>
        <Box sx={{ padding: '10px 0px' }} className={classes.header}>
          <Typography variant="h5" className={classes.title}>
            Get to know about our Business
          </Typography>
          {/* <TextField placeholder="Search" name="search" onChange={handleSearch} /> */}
        </Box>
        <ul className={classes.list}>
          <li className={selected === 'home' && 'active'} onClick={() => handleSetSelected('home')}>
            Home
            {/* {JSON.stringify({ selected })} */}
          </li>
          {category?.map((list, index) => (
            <li
              className={checkActive(list?.value)}
              key={index}
              onClick={() => handleSetSelected(list?.value)}>
              {list?.title}
            </li>
          ))}
        </ul>
      </Container>
    </Box>
  );
};

export default BusinessNav;
