import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: '30px'
  },
  overallRoot: {
    marginBottom: '30px'
  },
  childRoot: {
    padding: '23px 60px 15px 60px'
  },
  childList: {
    border: '1px solid #b8ccdd',
    marginBottom: '8px',
    borderRadius: '5px',
    display: 'flex',
    alignItems: 'center',
    columnGap: '20px',
    justifyContent: 'space-between'
  },
  count: {
    padding: '10px 20px',
    fontSize: '16px',
    fontWeight: '600',
    borderRight: '2px solid #fff',
    color: '#3f51b5'
  }
}));
