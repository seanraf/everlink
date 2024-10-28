import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { UrlButton } from '@/types';

const styles = {
  containerBox: {
    width: '90%',
    mx: 'auto',
    mb: 'auto',
    justifyContent: 'center',
    border: '1px solid black',
    borderRadius: '16px',
    textAlign: 'center',
    p: '32px 24px',
    bgcolor: 'dark.main',
    display: 'flex',
    flexDirection: 'column',
    gap: { md: 2, xs: 1.5 },
    '& .MuiTypography-root': {
      color: 'primary.contrastText',
    },
  },
  button: {
    bgcolor: 'primary.contrastText',
    color: 'dark.main',
    border: 'none',
    py: { md: 1.75, xs: 1 },
    borderRadius: '8px',
  },
  userName: { fontSize: { md: '29.58px', xs: '24px' } },
  bio: { fontSize: { md: '14px', xs: '12px' } },
};

export default function Dark({
  userName,
  bio,
  urlButtons,
}: {
  userName: string;
  bio: string;
  urlButtons: UrlButton[];
}) {
  return (
    <Box sx={styles.containerBox}>
      <Typography sx={styles.userName}>{userName}</Typography>
      <Typography sx={styles.bio}>{bio}</Typography>
      {urlButtons?.map((item) => (
        <Button
          key={item.id}
          sx={styles.button}
          variant='outlined'
          component='a'
          href={item?.url}
          target='_blank'
          rel='noopener noreferrer'
        >
          {item?.title}
        </Button>
      ))}
    </Box>
  );
}
