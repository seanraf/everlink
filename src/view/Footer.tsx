import React from 'react';
import Image from 'next/image';
import Digital from '../../public/Digital.png';
import { Box, Typography } from '@mui/material';
import Link from 'next/link';

const styles = {
  containerBox: {
    bgcolor: '#1a1d21',
    justifyContent: 'center',
    display: 'flex',
    height: '80px',
  },
  contentBox: { display: 'flex', gap: 2, alignItems: 'center' },
};
export default function Footer() {
  return (
    <Box sx={styles.containerBox}>
      <Box sx={styles.contentBox}>
        <Typography color='primary.contrastText'>Presented by</Typography>
        <Link href='http://www.33d.co/' target='_blank'>
          <Image src={Digital} alt='33 Digital' width={70} height={21} />
        </Link>
      </Box>
    </Box>
  );
}
