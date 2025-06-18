import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Box,
  Grid2,
  Modal,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { MinterProps } from '@/types';
import {
  CrossmintCheckoutProvider,
  CrossmintEmbeddedCheckout,
  useCrossmintCheckout,
} from '@crossmint/client-sdk-react-ui';
import localFont from 'next/font/local';
import Loader from './Loader';
import { useRouter } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';

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
  model: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { md: '50%', xs: '100%' },
    bgcolor: 'background.paper',
    borderRadius: 2,
    boxShadow: 24,
    p: { md: 3, xs: 1 },
    pt: { md: 8, xs: 6 },
    pb: 3,
  },
  modelCloseButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 1,
    cursor: 'pointer',
    width: 32,
    height: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '50%',
    backgroundColor: '#f5f5f5',
    transition: 'background 0.2s',
    '&:hover': {
      backgroundColor: '#e0e0e0',
    },
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

function CheckoutWithCallbacks({ deploymentTaskId }: any) {
  const [showCheckout, setShowCheckout] = useState(true);

  const collectionId = process.env
    .NEXT_PUBLIC_CROSSMINT_COLLECTION_ID as string;
  const { order } = useCrossmintCheckout();
  const router = useRouter();

  useEffect(() => {
    if (order && order.phase === 'completed') {
      router.push(
        `${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/success/${deploymentTaskId}`
      );
      setTimeout(() => {
        setShowCheckout(false);
      }, 2000);
    }

    if (order && order.lineItems) {
      const hasFailedItems = order.lineItems.some(
        (item) => item.delivery?.status === 'failed'
      );

      if (hasFailedItems) {
        router.push(`${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/failure`);
      }
    }
  }, [order, router, deploymentTaskId]);

  if (!showCheckout) {
    return <div>Payment successful! Thank you for your purchase.</div>;
  }

  return (
    <CrossmintEmbeddedCheckout
      lineItems={{
        collectionLocator: `crossmint:${collectionId}`,
        callData: {
          totalPrice: '0.001',
          quantity: 1,
        },
      }}
      payment={{
        crypto: { enabled: true },
        fiat: { enabled: true },
      }}
    />
  );
}

export default function Minter({
  setActiveStep,
  renderThemePreview,
  deploymentTaskId,
  loading,
}: MinterProps) {
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
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
                <Box
                  position={'relative'}
                  bgcolor={'#1ab4a3'}
                  borderRadius={'8px'}
                  sx={{
                    padding: isLargeScreen ? '14px 22px' : '10px 18px',
                    cursor: 'pointer',
                  }}
                  onClick={handleOpen}
                >
                  <Typography
                    sx={{
                      fontWeight: 900,
                      textAlign: 'center',
                      color: '#FFFFFF',
                    }}
                  >
                    Mint
                  </Typography>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby='modal-modal-title'
                    aria-describedby='modal-modal-description'
                    sx={{ mx: 2.5 }}
                  >
                    <Box sx={styles.model} position={'relative'}>
                      <Box
                        sx={styles.modelCloseButton}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleClose();
                        }}
                        aria-label='Close'
                      >
                        <CloseIcon fontSize='small' />
                      </Box>
                      <CrossmintCheckoutProvider>
                        <CheckoutWithCallbacks
                          deploymentTaskId={deploymentTaskId}
                        />
                      </CrossmintCheckoutProvider>
                    </Box>
                  </Modal>
                </Box>
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
