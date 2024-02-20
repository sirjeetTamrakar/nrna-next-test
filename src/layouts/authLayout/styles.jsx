import { makeStyles } from '@mui/styles';

const authWrapperStyles = {
  width: '100%',
  padding: '0 2.7rem 0 2.7rem',
  display: 'flex',
  justifyContent: 'center',
  marginTop: '2.5rem',
  flexDirection: 'column'
};

const useStyles = makeStyles((theme) => ({
  navIcon: {
    display: 'flex',
    alignItems: 'center',
    columnGap: '5px',
    lineHeight: '30px'
  },
  authContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '37.7rem',
    minHeight: ' 40rem',
    background: '#fff',
    boxShadow: '0px 20px 50px rgba(18, 17, 39, 0.08)'
  },
  authHead: {
    width: '100%',
    height: '4.1rem',
    background: theme.palette.grey[1],
    display: 'flex',
    alignItems: 'center',
    '& > *': {
      margin: '0.15rem'
    }
  },
  smallIcon: {
    width: '0.8rem',
    height: '0.8rem',
    borderRadius: '50%',
    background: '#ddd'
  },
  authLogo: {
    width: '3.2rem',
    height: '4.1rem',
    marginTop: '3.4rem'
  },
  authHeading: {
    fontFamily: 'Work Sans',
    fontWeight: '700',
    fontSize: '2.5rem',
    marginTop: '2.4rem',
    lineHeight: '2.9rem',
    color: theme.palette.text.main
  },
  signInWrapper: {
    ...authWrapperStyles,
    '&>*': {
      marginBottom: '4rem'
    }
  },
  signUpWrapper: {
    ...authWrapperStyles,
    '&>*': {
      marginBottom: '1rem'
    },
    paddingBottom: '4rem'
  }
}));

export default useStyles;
