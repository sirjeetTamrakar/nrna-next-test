import AccountContainer from './AccountContainer';
import useStyles from './styles';

function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AccountContainer />
    </div>
  );
}

export default Dashboard;
