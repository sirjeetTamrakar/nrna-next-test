import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 0,
    padding: '0',
    display: 'flex',
    minWidth: '1200px',
    '& .sidebarMobile': {
      display: 'none',

      [theme.breakpoints.down('md')]: {
        display: 'block'
      }
    },
    '& .sidebarDesk': {
      display: 'blobk',

      [theme.breakpoints.down('md')]: {
        display: 'none'
      }
    }
  },

  content: {
    minHeight: '100vh',
    paddingBlock: '1rem',
    paddingInline: '46px'
    // width: '100'
  }
}));

export default useStyles;
