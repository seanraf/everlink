'use client';
import React from 'react';

import { Box } from '@mui/material';
import Image from 'next/image';

export default function Page() {
  return (
    <Box sx={{ height: 'calc(100vh - 144px)', display: 'flex' }}>
      <Image
        src={'/loader.gif'}
        alt='Loader'
        width={60}
        height={60}
        style={{ margin: 'auto' }}
      />
    </Box>
  );
}
