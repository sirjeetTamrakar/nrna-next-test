import { Clear } from '@mui/icons-material';
import { Box, Fade, IconButton, Modal, Typography } from '@mui/material';
import { memo, useEffect, useState } from 'react';
import styles from './style';

function CustomModal({
  children,
  open,
  handleClose,
  width,
  height,
  modalTitle,
  modalSubtitle,
  modalStyles = {},
  icon,
  widthFull,
  padding,
  nonClose,
  titlePadding
}) {
  const classes = styles();
  function getModalStyle(height, width) {
    return {
      top: `50%`,
      left: `50%`,
      width: width || '800px',
      height: height || 'auto',
      maxHeight: height || '90vh',
      transform: 'translate(-50%, -50%)',
      overflowY: 'auto'
    };
  }
  const [modalStyle, setModalStyle] = useState();

  useEffect(() => {
    setModalStyle(getModalStyle(height, width));
  }, [height, width]);

  return (
    <Modal
      open={open}
      onClose={!nonClose && handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      closeAfterTransition>
      <Fade in={open}>
        <div style={{ ...modalStyle, ...modalStyles }} className={classes.paper}>
          {modalTitle && (
            <Box
              className={classes.modalHeader}
              sx={titlePadding && { paddingTop: '20px', paddingBottom: '20px' }}>
              <Box className={classes.modalTitleWrapper}>
                {icon && <Box className={classes.iconDanger}>{icon}</Box>}
                <Box>
                  <Typography className={classes.modalTitle}>
                    {modalTitle?.toUpperCase()}
                  </Typography>
                  <Typography className={classes.modalSubtitle}>{modalSubtitle}</Typography>
                </Box>
              </Box>
              {!nonClose && (
                <IconButton variant="subtitle1" className={classes.rotate} onClick={handleClose}>
                  <Clear />
                </IconButton>
              )}
            </Box>
          )}
          <Box sx={padding && { padding: '30px' }}>
            <Box>{children}</Box>
          </Box>
        </div>
      </Fade>
    </Modal>
  );
}

export default memo(CustomModal);
