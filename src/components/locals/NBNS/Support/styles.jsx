import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '60px 0',
    minHeight: 'calc(100vh - 60px)',
    [theme.breakpoints.down('md')]: {
      paddingTop: '20px '
    }
  },
  headerWrapper: {
    marginTop: '30px',
    padding: '60px',
    background: '#cae7ff',
    borderRadius: '5px',
    [theme.breakpoints.down('md')]: {
      padding: '40px'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '30px'
    }
  },
  title: {
    fontSize: '32px !important',
    fontWeight: '700 !important',
    textAlign: 'center',
    [theme.breakpoints.down('md')]: {
      fontSize: '28px !important'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '22px !important'
    }
  },
  subtitle: {
    fontSize: '20px !important',
    fontWeight: '500 !important',
    textAlign: 'center',
    color: '#575757',
    [theme.breakpoints.down('md')]: {
      fontSize: '18px !important'
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '16px !important'
    }
  },
  description: {
    fontSize: '16px !important'
  },
  donationWrapper: {
    padding: '30px',
    background: '#cae7ff',
    marginTop: '30px',
    maxWidth: '500px',
    margin: '0 auto',
    borderRadius: '5px',
    '& h6': {
      marginTop: '15px'
    }
  }
}));

export default useStyles;
