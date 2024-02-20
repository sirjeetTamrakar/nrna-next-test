import { Delete } from '@mui/icons-material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Box, Button, CircularProgress, IconButton } from '@mui/material';
import CustomModal from './CustomModal';

const CustomApproveModal = ({ open, handleClose, handleApprove, handleReject, isLoading }) => {
  return (
    <>
      <CustomModal
        open={open}
        width={'500px'}
        height={'230px'}
        icon={<Delete />}
        handleClose={handleClose}>
        <Box>
          <Box>
            <Box
              style={{
                fontSize: '17px',
                textAlign: 'center',
                margin: 0,
                padding: 0,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                width: '100%',
                marginTop: '20px'
              }}>
              <IconButton
                style={{
                  backgroundColor: '#dffffc',
                  width: '40px',
                  height: '40px'
                }}>
                <AutorenewIcon style={{ color: '#009688' }} />
              </IconButton>

              <p
                style={{
                  fontWeight: '500',
                  margin: 0,
                  padding: 0,
                  marginTop: '10px'
                }}>
                Do you want to Approve or Reject?
              </p>

              <p
                style={{
                  margin: 0,
                  padding: 0,
                  fontSize: '14px',
                  marginTop: '5px',
                  color: '#43434390'
                }}>
                Click green button to approve and red button to reject.
              </p>
            </Box>
          </Box>

          <Box
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
              //   height: "60px",
              gap: '10px',
              marginTop: '30px'
            }}>
            <Button
              variant="contained"
              onClick={() => handleApprove()}
              disabled={isLoading}
              color="success">
              {isLoading ? (
                <Box display={'flex'} alignItems={'center'} gap={'10px'}>
                  <CircularProgress size={15} style={{ color: '#fff' }} />
                  Approve
                </Box>
              ) : (
                'Approve'
              )}
            </Button>
            <Button
              variant="contained"
              onClick={() => handleReject()}
              disabled={isLoading}
              color="error">
              {isLoading ? (
                <Box display={'flex'} alignItems={'center'} gap={'10px'}>
                  <CircularProgress size={15} style={{ color: '#fff' }} />
                  Reject
                </Box>
              ) : (
                'Reject'
              )}
            </Button>
            <Button variant="outlined" onClick={() => handleClose()} color="primary">
              Cancel
            </Button>
          </Box>
        </Box>
      </CustomModal>
    </>
  );
};

export default CustomApproveModal;
