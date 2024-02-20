import { Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useStyles } from './styles';

const SecondaryNav = ({ category, selected, setSelected, setSearch }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const checkActive = (slug) => {
    if (selected) {
      if (slug === selected) {
        return 'active';
      } else return '';
    } else if (slug === category?.[0]?.id) {
      return 'active';
    } else {
      return '';
    }
  };
  //   const handleSearch = (e) => {
  //     setSearch(e.target.value);
  //   };
  const handleSetSelected = (slug) => {
    setSelected(slug);
    navigate(`/dashboard/news/news-management`, { state: slug });
  };

  return (
    <Box className={classes.rootNav}>
      <Container>
        <Box sx={{ padding: '5px 0px' }} className={classes.header}>
          {/* <Typography variant="h5" className={classes.title}>
            News management
          </Typography> */}
          {/* {setSearch && <TextField placeholder="Search" name="search" onChange={handleSearch} />} */}
        </Box>
        <ul className={classes.list}>
          <li className={selected === 'ALL' && 'active'} onClick={() => handleSetSelected('ALL')}>
            All
            {/* {JSON.stringify({ selected })} */}
          </li>
          {category?.map((list, index) => (
            <li
              className={checkActive(list?.id)}
              key={index}
              onClick={() => handleSetSelected(list?.id)}>
              {list?.title}
            </li>
          ))}
        </ul>
      </Container>
    </Box>
  );
};

export default SecondaryNav;
