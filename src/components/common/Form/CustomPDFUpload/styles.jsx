import { makeStyles } from '@mui/styles';

const styles = makeStyles((theme) => ({
  inputFileWrap: {
    border: '1px solid #cacaca',
    padding: '15px',
    // width: "350px",
    width: '350px',
    height: '350px',
    background: '#fff',
    borderRadius: '4px',
    textAlign: 'center',
    marginTop: '5px',
    '&.image-preview': {
      padding: '0'
    },
    '& svg': {
      fontSize: '36px',
      color: '#b9b8b8'
    },
    // "&.drag-active, &:focus, &:active": {
    //   borderColor: `${theme.palette.blue.active}`,
    // },
    '& .title': {
      fontSize: '14px',
      color: '#2b6df8',
      fontWeight: '500'
    },
    '& .or': {
      fontSize: '13px',
      marginBottom: '2px'
    },
    '& button': {
      background: '#2b6df8',
      fontSize: '12px',
      fontWeight: '600',
      padding: '4px 10px',
      textTransform: 'none',
      '&:hover, &:active': {
        background: '#2b6df8'
        // color: "#ab003c",
      }
      // "&:active": {
      //   border: "1px solid #ab003c",
      // },
    },
    '& .image-container': {
      position: 'relative',
      // width: "100px",
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      cursor: 'pointer',
      '& svg': {
        position: 'absolute',
        top: '-1rem',
        right: '-3rem',
        fontSize: '20px',
        color: 'grey',
        cursor: 'pointer'
      },
      '& img': {
        width: '100%',
        // height: "120px",
        height: '330px',
        objectFit: 'cover'
        // aspectRatio: "4/3",
      }
    }
  },
  inputFileWrapFull: {
    border: '1px solid #cacaca',
    padding: '15px',
    // width: "350px",
    width: '100%',
    height: '160px',
    background: '#fff',
    borderRadius: '4px',
    textAlign: 'center',
    marginTop: '5px',
    '&.image-preview': {
      padding: '0'
    },
    '& svg': {
      fontSize: '36px',
      color: '#b9b8b8'
    },
    // "&.drag-active, &:focus, &:active": {
    //   borderColor: `${theme.palette.blue.active}`,
    // },
    '& .title': {
      fontSize: '14px',
      color: '#2b6df8',
      fontWeight: '500'
    },
    '& .or': {
      fontSize: '13px',
      marginBottom: '2px'
    },
    '& button': {
      background: '#2b6df8',
      fontSize: '12px',
      fontWeight: '600',
      padding: '4px 10px',
      textTransform: 'none',
      '&:hover, &:active': {
        background: '#2b6df8'
        // color: "#ab003c",
      }
      // "&:active": {
      //   border: "1px solid #ab003c",
      // },
    },
    '& .image-container': {
      position: 'relative',
      // width: "100px",
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      cursor: 'pointer',
      '& svg': {
        position: 'absolute',
        top: '-1rem',
        right: '-3rem',
        fontSize: '20px',
        color: 'grey',
        cursor: 'pointer'
      },
      '& img': {
        width: '100px',
        // height: "120px",
        height: '100px',
        objectFit: 'cover'
        // aspectRatio: "4/3",
      }
    }
  }
}));

export default styles;
