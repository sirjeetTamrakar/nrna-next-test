import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import Register from './Register';

export default function Tagline() {
  const { get_site_settings_loading } = useSelector((state) => state.settings);
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
            Tagline Section
          </Typography>
        </Box>
        {!get_site_settings_loading ? (
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
