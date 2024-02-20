import { makeStyles } from '@mui/styles';

const style = makeStyles((theme) => ({
  richTextEditor: {
    '& .ck-editor__main > .ck-editor__editable': {
      height: '300px'
    }
  },
  descriptionLable: {
    color: '#383751',
    fontSize: '14px !important',
    fontWeight: '700 !important',
    marginBottom: '6px !important'
  }
}));

export default style;
