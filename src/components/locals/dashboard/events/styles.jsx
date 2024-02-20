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
  example: {
    fontSize: '12px',
    display: '-webkit-box',
    '-webkit-line-clamp': 1,
    '-webkit-box-orient': 'vertical',
    overflow: 'hidden',
    color: 'gray'
  }
}));
