import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  drawer: {
    paddingInline: '12px',
    '& .MuiDrawer-paper': {
      backgroundColor: 'red !important',
      width: '0px !important'
    }
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    columnGap: '7px',
    width: '100%',
    '& img': { height: '35px', width: 'auto', objectFit: 'contain' }
  },
  drawerContent: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    paddingBlock: '1rem'
  },
  nav: {
    '& > a': {
      transition: 'all 1s ease-in-out',
      color: theme.palette.text.main,
      textDecoration: 'none'
    }
  },
  activeClass: {
    transition: 'all 1s ease-in-out',
    color: '#4559BD !important',
    '& > *': {
      background: '#E1F5FF !important'
    },
    '& .MuiTypography-root': {
      fontWeight: '600'
    }
  },
  activeChildClass: {
    transition: 'all 1s ease-in-out',
    color: '#000 !important',
    background: '#F9F9FB !important',
    borderRadius: '5px !important',
    fontWeight: 'bolder !important',
    position: 'relative',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '50%',
      left: '-8px',
      width: '9px',
      height: '1px',
      background: '#E5E5EB',
      zIndex: -1
    },

    '& .MuiTypography-root': {
      fontWeight: '600'
    }
  },

  listItemButton: {
    justifyContent: 'initial',
    paddingInline: '12px !important',
    paddingBlock: '8px !important',
    fontSize: theme.typography.fontSize.medium
  },
  listItemButtonChild: {
    paddingInline: '12px !important',
    paddingBlock: '4px !important',
    borderRadius: '5px !important',
    fontSize: theme.typography.fontSize.small,
    '& svg': {
      fontSize: 'small'
    }
  },

  childContainer: {
    paddingTop: '12px',
    borderLeft: '1px solid #E5E5EB',
    marginInline: '20px',
    paddingInline: '8px'
  },
  iconButton: {
    borderRadius: '0 !important',
    '&:hover': {
      color: `${theme.palette.primary.main} !important`,
      background: `${theme.palette.primary.light} !important`
    }
  },

  addAllContainer: {
    display: 'flex',
    columnGap: '3rem',
    padding: '1rem',
    justifyContent: 'center',

    '& button': {
      color: theme.palette.text.light,
      '&:hover': {
        '& svg': {
          transition: '200ms all ease-in-out',
          color: theme.palette.primary.main
        }
      }
    }
  },
  title: {
    textTransform: 'uppercase',
    marginBottom: '1rem',
    marginLeft: '.5rem'
  }
}));

export default useStyles;
