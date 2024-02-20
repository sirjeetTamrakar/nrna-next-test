import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '60px 0'
    // height: 'calc(100vh - 60px)'
  },
  headerWrapper: {
    marginTop: '30px',
    padding: '60px',
    background: '#cae7ff',
    borderRadius: '5px'
  },
  title: {
    fontSize: '32px !important',
    fontWeight: '700 !important',
    textAlign: 'center'
  },
  subtitle: {
    fontSize: '20px !important',
    fontWeight: '500 !important',
    textAlign: 'center',
    color: '#575757'
  },
  description: {
    fontSize: '16px !important'
  },
  surveyQuestionRoot: {
    padding: '90px 0'
  },
  surveyPageTitle: {
    fontSize: '30px !important',
    fontWeight: '600 !important'
  },
  questionSection: {
    maxWidth: '800px',
    margin: '0 auto',
    marginTop: '60px'
  },
  questionWrapper: {
    marginBottom: '30px'
  },
  question: {
    fontSize: '16px !important',
    marginBottom: '10px !important'
  },
  answerWrapper: {
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    padding: 0,
    margin: 0,
    columnGap: '15px',
    '& li': {
      width: 'calc(30% - 15px)',
      margin: '5px auto',
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'center',
      columnGap: '8px',
      padding: '0 10px',
      borderRadius: '4px',
      '&:hover': {
        background: '#f0f0f0'
      },
      '& input': {
        minWidth: '16px',
        minHeight: '16px',
        cursor: 'pointer'
      },
      '& label': {
        margin: 0,
        cursor: 'pointer',
        width: '100%',
        padding: '10px'
      }
    }
  },
  phoneInput: {
    '& .react-tel-input .form-control': {
      width: '100%'
    }
  }
}));

export default useStyles;
