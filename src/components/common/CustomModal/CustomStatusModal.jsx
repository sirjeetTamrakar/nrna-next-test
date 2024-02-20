import { Delete } from '@mui/icons-material';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Box, Button, CircularProgress, IconButton } from '@mui/material';
import CustomModal from './CustomModal';

const CustomStatusModal = ({
  open,
  handleClose,
  handleConfirm,
  isLoading,
  status,
  modalTitle,
  id
}) => {
  return (
    <>
      <CustomModal
        open={open}
        width={'500px'}
        height={'216px'}
        icon={<Delete />}
        // modalTitle={modalTitle}
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
                Do you want to change status of this record?
              </p>
              {status === 'Active' || status === 'true' ? (
                <p
                  style={{
                    margin: 0,
                    padding: 0,
                    fontSize: '14px',
                    marginTop: '5px',
                    color: '#008478'
                  }}>
                  {`${
                    status === 'true'
                      ? 'Your default template status is true'
                      : 'Your current status is Active'
                  }`}
                </p>
              ) : (
                <p
                  style={{
                    margin: 0,
                    padding: 0,
                    fontSize: '14px',
                    marginTop: '5px',
                    color: '#d92323'
                  }}>
                  {`${
                    status === 'false'
                      ? 'Your default template status is false'
                      : 'Your current status is Inactive'
                  }`}{' '}
                </p>
              )}
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
              onClick={() => handleConfirm(id)}
              disabled={isLoading}
              color="primary">
              {isLoading ? (
                <Box display={'flex'} alignItems={'center'} gap={'10px'}>
                  <CircularProgress size={15} style={{ color: '#fff' }} />
                  Update
                </Box>
              ) : (
                'Update'
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

export default CustomStatusModal;
