import { Box, Paper, Typography } from '@mui/material';
import Register from './Register';

export default function Tagline() {
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

        <Register />
      </Paper>
    </>
  );
}
