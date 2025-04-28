import React from 'react';
import Image from 'next/image';
import { Box, Grid2, Typography, useMediaQuery, useTheme } from '@mui/material';
import { MinterProps } from '@/types';
import { CrossmintPayButton } from '@crossmint/client-sdk-react-ui';
import localFont from 'next/font/local';
import Loader from './Loader';

const styles = {
  containerBox: {
    minHeight: 'calc(100vh - 73px)',
    display: 'flex',
    backgroundImage: "url('/LandingBackground.png')",
    backgroundRepeat: 'round',
    width: '100%',
  },
  mainBox: {
    width: '100%',
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
    '& .MuiTypography-root': { color: '#23343A' },
  },
  linkBox: {
    display: 'flex',
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
    filter: 'blur(4px)',
    userSelect: 'none',
    px: 1,
  },
  iconBox: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRight: '1px solid #EBEBEB',
    height: '100%',
    px: { md: 2.2, xs: 1.5 },
  },
  previewBox: {
    width: { md: '90%', sm: '75%', xs: '90%' },
    display: 'flex',
  },
};

const nibPro = localFont({
  src: [
    {
      path: '../../public/fonts/NibPro/NibPro-Italic.woff2',
      weight: '400',
      style: 'italic',
    },
  ],
  variable: '--font-nib-pro',
});

export default function Minter({
  setActiveStep,
  renderThemePreview,
  deploymentTaskId,
  loading,
}: MinterProps) {
  const projectId = process.env.NEXT_PUBLIC_CROSSMINT_PROJECT_ID as string;
  const collectionId = process.env
    .NEXT_PUBLIC_CROSSMINT_COLLECTION_ID as string;
  const environment = process.env.NEXT_PUBLIC_CROSSMINT_ENVIRONMENT as string;
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Box sx={styles.containerBox} position={'relative'}>
      {loading && <Loader bgcolor={'#FFFFFFCC'} />}
      <Grid2 container width={'90%'} mx={'auto'}>
        <Grid2 size={{ md: 7.5, xs: 12 }} display={'flex'}>
          {' '}
          <Box sx={styles.mainBox}>
            <Box sx={styles.textBox}>
              <Typography sx={styles.heading}>
                Your Link is{' '}
                <Box component={'span'} className={nibPro.className}>
                  Ready
                </Box>{' '}
                ! 🎉
              </Typography>
              <Typography fontSize={{ md: 24, xs: 16 }}>
                To activate and make your link live forever,
                <br /> complete your payment now.
              </Typography>
            </Box>
            <Box
              sx={styles.linkBox}
              width={{ md: '60%', sm: '65%', xs: '100%' }}
            >
              <Box sx={styles.iconBox}>
                <Image
                  src={'/ChainIcon.svg'}
                  alt='Chain Icon'
                  width={25.94}
                  height={25.94}
                />
              </Box>
              <Box flexGrow={1} overflow={'hidden'}>
                <Typography sx={styles.linkText}>
                  https://www.everlink.com/l5TzftrtkA_Nbc1uukUteXLSIgQhcFNZP-Hb4pJBtdg
                </Typography>
              </Box>
              <Box
                m={{
                  md: '8px 6px',
                  xs: '6px 2px',
                }}
              >
                <CrossmintPayButton
                  projectId={projectId}
                  collectionId={collectionId}
                  environment={environment}
                  getButtonText={(connecting) =>
                    connecting ? `Connecting` : `Mint`
                  }
                  className='xmint-btn'
                  style={{ padding: isLargeScreen ? '14px 18px' : '10px 18px' }}
                  mintConfig={{
                    type: 'erc-721',
                    price: '5',
                    quantity: '1',
                  }}
                  checkoutProps={{
                    paymentMethods: ['fiat', 'ETH', 'SOL'],
                    display: 'new-tab',
                  }}
                  successCallbackURL={`${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/success/${deploymentTaskId}`}
                  failureCallbackURL={`${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/failure`}
                />
              </Box>
            </Box>
          </Box>
        </Grid2>
        <Grid2
          size={{ md: 4.5, xs: 12 }}
          sx={{
            display: 'flex',
            px: { md: 3, xs: 'unset' },
            py: '74px',
            justifyContent: { md: 'end', xs: 'center' },
          }}
        >
          <Box sx={styles.previewBox}>{renderThemePreview()}</Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}
