import React from 'react';
import { Box, Typography } from '@mui/material';

export default function page() {
  return (
    <Box display={'flex'} height={'80vh'}>
      <Typography sx={{ fontSize: 36, m: 'auto' }}>
        Payment Successful
      </Typography>
    </Box>
  );
}
