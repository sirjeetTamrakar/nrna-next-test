import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    background: '#276fc4'
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
    lineHeight: '80% !important'
  },
  list: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'flex-start',
    columnGap: '45px',
    margin: 0,
    padding: 0,
    '& li': {
      fontSize: '14px',
      color: '#fff',
      fontWeight: '400',
      paddingBottom: '5px',
      cursor: 'pointer',
      texWrap: 'nowrap',
      '&.active': {
        borderBottom: '4px solid #fff'
      }
    },
    [theme.breakpoints.down('md')]: {
      // width: '90%',
      overflow: 'auto',
      overflowY: 'hidden',
      columnGap: '20px'
    }
  }
}));
