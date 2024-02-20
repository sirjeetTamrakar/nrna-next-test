import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '3rem',
    background: '#F9F9FB',
    minHeight: 'calc(100vh - 60px)'
  },
  title: {
    fontSize: '14px'
  },
  widget: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    display: 'inline-block',
    padding: '2rem',
    background: '#ffffff',
    marginTop: '1rem',
    textAlign: 'center',
    borderRadius: '4px',
    marginRight: '2.5rem',
    '& svg': {
      fontSize: '30px'
    }
  },
  widgetTitle: {
    fontSize: '12px'
  },
  employeeContainer: {
    marginTop: '3rem'
  },
  employee: {
    color: theme.palette.primary.main,
    cursor: 'pointer',
    display: 'inline-block',
    padding: '3rem',
    background: '#ffffff',
    marginTop: '1rem',
    textAlign: 'center',
    borderRadius: '4px',
    marginRight: '2.5rem',
    minWidth: '16rem',
    position: 'relative',
    boxShadow: '0px 1px 4px #e7e7e7'
  },

  employeeTitle: {
    position: 'absolute',
    fontSize: '12px',
    bottom: '0',
    left: '0',
    right: '0',
    color: 'white',
    padding: '2px',
    margin: '0 10px',
    borderRadius: '4px 4px 0 0'
  },
  count: {
    fontSize: '26px',
    fontWeight: '600'
  },
  total: {
    background: '#03a9f4'
  },
  active: {
    background: '#64c368'
  },
  inactive: {
    background: '#f88888'
  }
}));

export default useStyles;
