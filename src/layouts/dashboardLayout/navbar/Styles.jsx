import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    columnGap: '2rem',
    '& .hamburger': {
      display: 'none',
      [theme.breakpoints.down('md')]: {
        display: 'block'
      }
    },
    '& .MuiButton-root': {
      color: theme.palette.text.main
    },
    marginBlock: '10px'
  },
  header: {
    display: 'flex',
    flexDirection: 'column'
  },
  main: {
    display: 'flex',
    fontSize: '16px',
    fontWeight: '600',
    color: theme.palette.text.main,
    textTransform: 'capitalize'
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    columnGap: '3rem'
  },
  breadcrumbs: {
    fontSize: '12px'
  },
  navLinkWrapper: {
    display: 'flex',
    height: '100%',
    // columnGap: "2rem",
    // gap: "1rem",
    rowGap: '0.5rem',
    alignItems: 'center',
    flexWrap: 'wrap',
    padding: '10px 0px',

    '& > a': {
      color: theme.palette.text.light,
      textDecoration: 'none',
      borderRight: '2px solid #48484860',
      padding: '0px 10px',
      '&:last-child': {
        borderRight: 'none'
      },

      '& > p': {
        fontSize: theme.typography.fontSize.small,
        fontWeight: '800'
      }
    }
  },

  active: {
    color: `${theme.palette.primary.main} !important`
  },

  othersWrapper: {
    padding: '0px',
    margin: '0px',
    '& > a': {
      color: theme.palette.text.main,
      textDecoration: 'none',

      '& > p': {
        fontSize: theme.typography.fontSize.small,
        fontWeight: '800'
      }
    }
  },
  userWrapper: {
    padding: '0px 8px',
    borderRadius: '4px',
    marginRight: '10px',
    background: '#fff',
    display: 'flex',
    justifyContent: 'flex-start',
    columnGap: '10px',
    alignItems: 'center'
  },
  name: {
    margin: '0',
    fontSize: '12px',
    fontWeight: '500'
  },
  role: {
    margin: '0',
    fontSize: '11px',
    textTransform: 'capitalize'
  }
}));

export default useStyles;
