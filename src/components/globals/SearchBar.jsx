import { createStyles, makeStyles } from '@mui/styles';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase } from '@mui/material';
const useStyles = makeStyles((theme) =>
  createStyles({
    search: {
      display: 'flex',
      alignSelf: 'end !important',
      position: 'relative',
      padding: '1px 10px',
      borderRadius: '0',
      border: `1px solid ${theme.palette.grey[300]}`,
      marginLeft: '0 !important',
      background: theme.palette.grey[100],
      width: '240px !important',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto'
      }
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      color: theme.palette.grey[400],
      width: '2rem',
      lineHeight: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '& svg': {
        fontSize: '2rem'
      },
      '&:hover': {
        cursor: 'pointer'
      }
    },
    inputRoot: {
      color: 'inherit',
      flex: '1'
    },
    inputInput: {
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
      transition: theme.transitions.create('width'),
      width: '100%',
      fontSize: '1.2rem'

      // [theme.breakpoints.up('sm')]: {
      //   width: '12ch',
      //   '&:focus': {
      //     width: '20ch'
      //   }
      // }
    }
  })
);

export default function Search({ setSearch }) {
  const classes = useStyles();
  return (
    <div className={classes.search}>
      <InputBase
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search..."
        classes={{
          root: classes.inputRoot,
          input: classes.inputInput
        }}
        inputProps={{ 'aria-label': 'search' }}
      />
      <div className={classes.searchIcon} onClick={() => alert('Search Event Trigger')}>
        <SearchIcon />
      </div>
    </div>
  );
}
