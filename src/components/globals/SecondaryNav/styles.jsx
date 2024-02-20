import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    background: '#276fc4',
    [theme.breakpoints.down('md')]: {
      // background: 'red'
    }
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    '& input': {
      height: '16px',
      background: '#5d9fee',
      color: '#fff',
      borderRadius: '4px'
    }
  },
  title: {
    fontSize: '24px !important',

    color: '#fff',
    fontWeight: '600 !important',
    lineHeight: '25px !important',
    paddingTop: '15px',
    [theme.breakpoints.down('sm')]: {
      fontSize: '22px !important'
    }
  },
  list: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'flex-start',
    columnGap: '45px',
    margin: 0,
    padding: 0,
    paddingTop: '10px',
    '& li': {
      fontSize: '14px',
      color: '#fff',
      fontWeight: '400',
      paddingBottom: '5px',
      cursor: 'pointer',
      [theme.breakpoints.down('md')]: {
        width: 'max-content'
      },
      '&.active': {
        borderBottom: '4px solid #fff'
      }
    },
    [theme.breakpoints.down('md')]: {
      // width: '0%',
      overflow: 'auto',
      overflowY: 'hidden'
    }
  },
  joinBtnNavbar: {
    width: '105px',
    border: '2px solid #fff',
    padding: '7px 10px',
    boxShadow: 'none',
    color: '#fff',
    borderRadius: '4px'
  }
}));
