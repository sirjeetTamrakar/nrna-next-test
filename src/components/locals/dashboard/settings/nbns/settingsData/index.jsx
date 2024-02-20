import { Box, Paper, Typography } from '@mui/material';
import Register from './Register';

export default function SettingsData() {
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
            Settings Data
          </Typography>
        </Box>

        <Register />
      </Paper>
    </>
  );
}
