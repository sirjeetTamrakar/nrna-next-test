import { Box, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useStyles } from './styles';

const NccNav = ({ category, selected, setSelected, setSearch }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const checkActive = (slug) => {
    if (selected) {
      if (slug === selected) {
        return 'navActive';
      } else return '';
    } else if (slug === category?.[0]?.value) {
      return 'navActive';
    } else {
      return '';
    }
  };
  // const handleSearch = (e) => {
  //   setSearch(e.target.value);
  // };
  const handleSetSelected = (slug) => {
    setSelected(slug);

    slug !== 'home' && navigate(`/nrna/ncc/${slug}`, { state: slug });
    slug === 'home' && navigate(`/nrna/ncc`, { state: slug });
  };
  return (
    <Box className={classes.rootNav}>
      <Container>
        <Box sx={{ padding: '10px 0px' }} className={classes.header}>
          <Typography variant="h5" className={classes.title}>
            Get to know about NCC
          </Typography>
          {/* <TextField placeholder="Search" name="search" onChange={handleSearch} /> */}
        </Box>
        <ul className={classes.list}>
          <li
            className={selected === 'home' && 'navActive'}
            onClick={() => handleSetSelected('home')}>
            Home
            {/* {JSON.stringify({ selected })} */}
          </li>
          {category?.map((list, index) => (
            <li
              className={checkActive(list?.value)}
              key={index}
              onClick={() => handleSetSelected(list?.value)}>
              <div style={{ width: 'max-content' }}>{list?.title}</div>
            </li>
          ))}
        </ul>
      </Container>
    </Box>
  );
};

export default NccNav;
