import { Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useStyles } from './styles';

const SecondaryNav = ({ category, selected, setSelected, setSearch, id }) => {
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
  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleSetSelected = (slug) => {
    setSelected(slug);
    navigate(`/${id}/news`, { state: slug });
  };
  return (
    <Box className={classes.root}>
      <Container>
        <Box sx={{ padding: '10px 0px' }} className={classes.header}>
          {/* <Typography variant="h5" className={classes.title}>
            News
          </Typography> */}
          {/* {setSearch && <TextField placeholder="Search" name="search" onChange={handleSearch} />} */}
        </Box>
        <ul className={classes.list}>
          {category?.map((list, index) => (
            <li
              className={checkActive(list?.id)}
              key={index}
              onClick={() => handleSetSelected(list?.id)}>
              <div style={{ width: 'max-content', padding: '0px 10px' }}>{list?.title}</div>
            </li>
          ))}
        </ul>
      </Container>
    </Box>
  );
};

export default SecondaryNav;
