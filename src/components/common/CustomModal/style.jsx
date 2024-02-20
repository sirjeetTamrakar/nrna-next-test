import { makeStyles } from '@mui/styles';

const styles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    borderRadius: '3px',
    overflow: 'hidden',
    boxShadow: theme.shadows[5],
    '&:focus-visible': {
      outline: 'none'
    }
  },
  modalHeader: {
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    backgroundColor: '#fff',
    padding: '11px 34px',
    color: '#1368ac',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '13px',
    borderBottom: '1px solid #ddd',

    '& svg': {
      color: '#1368ac !important'
    }
  },
  modalTitleWrapper: {
    display: 'flex',
    alignItems: 'center',
    columnGap: '0.5rem'
  },
  modalTitle: {
    fontSize: '16px !important',
    fontWeight: '600 !important',
    lineHeight: '1 !important'
  },
  modalSubtitle: {
    color: '#6f6f6f',
    fontSize: '12px !important',
    fontWeight: '400'
  },
  icon: {
    background: theme.palette.background.dark,
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    padding: '5px'
  },
  rotate: {
    transition: 'transform 0.3s ease',
    transform: 'rotate(0deg)', // Initial rotation value
    '&:hover': {
      transform: 'rotate(90deg)' // Rotation value on hover
    }
  },
  iconDanger: {
    '& svg': {
      height: '40px',
      width: '40px'
    }
  }
}));

export default styles;
