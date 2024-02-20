import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: '30px'
  },
  footerRoot: {
    padding: '0px 30px 30px 0'
  },
  listWrapper: {
    listStyle: 'none',
    padding: '0',
    margin: '0',
    '& li': {
      padding: '5px 20px',
      cursor: 'pointer',
      '&:hover': {
        background: theme.palette.primary.light
      }
    }
  },
  childRoot: {
    padding: '23px 60px 15px 60px'
  },
  childList: {
    border: '1px solid #b8ccdd',
    padding: '10px 10px',
    marginBottom: '8px',
    borderRadius: '3px'
  }
}));
