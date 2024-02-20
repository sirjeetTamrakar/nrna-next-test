import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getEmailTemplate } from '../redux/actions';
import Register from './Register';

export default function SettingsData() {
  const dispatch = useDispatch();

  const { get_email_template_loading } = useSelector((state) => state.emailTemplate);

  useEffect(() => {
    const data = { email_type: 'nbns' };
    dispatch(getEmailTemplate(data));
  }, []);

  return (
    <>
      <Paper sx={{ padding: '20px', marginInline: '-20px' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
          <Typography component="h4" sx={{ fontSize: '20px', marginBottom: '10px' }}>
            NBNS Email Template
          </Typography>
        </Box>
        {!get_email_template_loading ? (
          <Register />
        ) : (
          <Box display={'flex'} justifyContent={'center'} alignItems={'center'} height={'60vh'}>
            <CircularProgress size={24} />
          </Box>
        )}
      </Paper>
    </>
  );
}
