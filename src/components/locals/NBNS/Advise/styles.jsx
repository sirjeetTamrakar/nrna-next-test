import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '30px 60px ',
    marginTop: '40px',
    [theme.breakpoints.down('md')]: {
      padding: '30px 40px ',
      marginTop: '60px'
    },
    [theme.breakpoints.down('sm')]: {
      padding: '30px 20px ',
      marginTop: '30px'
    }
  },
  headerWrapper: {},
  formContainer: {
    padding: '30px 45px 30px',
    border: '1px solid grey',
    marginTop: '30px',
    borderRadius: '5px',
    [theme.breakpoints.down('md')]: {
      padding: '30px 25px 30px'
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
  formTitle: {
    fontSize: '22px !important',
    fontWeight: '600 !important',
    textAlign: 'center'
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
    fontSize: '14px !important',
    marginBottom: '20px !important',
    textAlign: 'center'
  },
  submit_btn_box: {
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
      width: '100% !important'
    }
  },
  submit_btn: {
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center'
    },
    '&.css-1h2sv0j': {
      [theme.breakpoints.down('md')]: {
        justifyContent: 'center'
      }
    }
  }
  // advice_submit_form_container: {
  //   [theme.breakpoints.down('md')]: {
  //     padding: '30px 20px 30px !important'
  //   }
  // }
}));

export default useStyles;
