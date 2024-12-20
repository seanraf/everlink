import React from 'react';
import Link from 'next/link';
import { Box, Typography } from '@mui/material';

export default function page() {
  return (
    <Box display={'flex'} height={'80vh'}>
      <Box m={'auto'} display={'flex'} flexDirection={'column'} gap={2}>
        <Typography sx={{ fontSize: 30 }}>Loading...</Typography>
        <Link
          href={'/'}
          style={{
            textDecoration: 'none',
            display: 'inline-flex',
            margin: 'auto',
          }}
        >
          <Typography
            sx={{
              p: '3px 8px',
              border: '2px solid gray',
              borderRadius: '4px',
              width: 'fit-content',
              color: 'secondary.main',
            }}
          >
            Back to Home
          </Typography>
        </Link>
      </Box>
    </Box>
  );
}
