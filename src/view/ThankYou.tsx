import React, { useState } from 'react';
import { Box, Button, Tooltip, Typography } from '@mui/material';
import Image from 'next/image';

const styles = {
  containerBox: {
    height: 'calc(100vh - 73px)',
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    backgroundImage: "url('/LandingBackground.png')",
    backgroundRepeat: 'round',
    mx: 'auto',
  },
  mainBox: {
    display: 'flex',
    flexDirection: 'column',
    my: 'auto',
  },
  heading: {
    fontSize: { md: '64px', xs: '32px' },
    fontWeight: 600,
    letterSpacing: { md: -3, xs: -1 },
  },
  shareToFarcaster: {
    width: 'fit-content',
    color: 'primary.main',
    gap: '8px',
    mx: 'auto',
    border: '2px solid #855DCD',
    borderRadius: '8px',
    padding: '8px 16px',
    fontWeight: 'bold',
  },
  textBox: {
    textAlign: 'center',
    '& .MuiTypography-root': { color: '#23343A' },
  },
  linkBox: {
    display: 'flex',
    mx: 'auto',
    height: { md: '64px', xs: '48px' },
    alignItems: 'center',
    marginTop: '16px',
    bgcolor: 'primary.contrastText',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    my: 3,
    overFlow: 'hidden',
  },
  linkText: {
    flexGrow: 1,
    wordBreak: 'break-all',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    ml: 1,
  },
  iconBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRight: '1px solid #EBEBEB',
    height: '100%',
    px: { md: 2.2, xs: 1.5 },
  },
  copyButton: {
    backgroundColor: 'secondary.main',
    color: 'primary.contrastText',
    p: { md: '10px 24px', xs: '6px 18px' },
    fontSize: { md: 16, xs: 14 },
    mx: { md: 1, xs: 0.5 },
    borderRadius: '8px',
    '&:hover': {
      backgroundColor: 'secondary.main',
    },
  },
};
export default function ThankYou() {
  const [link, setLink] = useState(
    'https://example.com/your-personalized-link'
  );
  const [tooltipOpen, setTooltipOpen] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    setTooltipOpen(true);

    setTimeout(() => {
      setTooltipOpen(false);
    }, 1500);
  };
  return (
    <Box sx={styles.containerBox}>
      <Box sx={styles.mainBox} width={'100%'}>
        <Box sx={styles.textBox}>
          <Typography sx={styles.heading}>
            <Box component={'span'} sx={{ fontFamily: 'Nib Pro' }}>
              ThankYou
            </Box>{' '}
            For Your Purchase
          </Typography>
          <Typography fontSize={{ md: 24, xs: 16 }}>
            Your personalized link page is now hosted forever.
          </Typography>
          <Typography fontSize={{ md: 24, xs: 16 }}>Share it!</Typography>
        </Box>
        <Box sx={styles.linkBox} width={{ md: '50%', sm: '75%', xs: '100%' }}>
          <Box sx={styles.iconBox}>
            <Image
              src={'/ChainIcon.svg'}
              alt='Chain Icon'
              width={25.94}
              height={25.94}
            />
          </Box>
          <Typography sx={styles.linkText}>{link}</Typography>
          <Tooltip
            title='Copied!'
            open={tooltipOpen}
            disableHoverListener
            disableFocusListener
            disableTouchListener
            placement='top'
            arrow
          >
            <Button sx={styles.copyButton} onClick={handleCopy}>
              Copy
            </Button>
          </Tooltip>
        </Box>
        <Button variant='outlined' sx={styles.shareToFarcaster}>
          <Image
            src={'/FarcasterPurpleLogo.svg'}
            alt='Icon'
            width={25.86}
            height={24}
          />
          Share To Farcaster Frame
        </Button>
      </Box>
    </Box>
  );
}
