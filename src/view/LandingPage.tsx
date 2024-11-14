'use client';
import { useAuth } from '@crossmint/client-sdk-react-ui';
import { Box, Button, Container, Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const styles = {
  outerBox: {
    backgroundImage: "url('/LandingBackground.png')",
    backgroundRepeat: 'round',
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '64px',
    my: { md: 12, xs: 7 },
  },
  containerBox: {
    mx: 'auto',
    display: 'flex',
    flexDirection: 'column',
    textAlign: 'center',
    gap: '24px',
  },
  title: {
    fontSize: { md: 64, xs: 32 },
    fontWeight: 700,
    lineHeight: 1,
    letterSpacing: { md: '-3px', xs: '-2px' },
  },
  description: {
    '& .MuiTypography-root': {
      fontSize: { md: 24, xs: 16 },
    },
  },
  ownText: { fontWeight: '400', fontFamily: 'Nib Pro' },
  farcasterConnectingButton: {
    width: 'fit-content',
    bgcolor: 'primary.main',
    color: 'primary.contrastText',
    gap: '8px',
    mx: 'auto',
    borderRadius: '8px',
    padding: '8px 16px',
  },
};
export default function LandingPage() {
  const { login, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  useEffect(() => {
    const registerUser = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/register`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              fid: user?.farcaster?.fid,
              username: user?.farcaster?.username,
            }),
          }
        );

        if (!response.ok) {
          throw new Error('Failed to register the user');
        }
        const _result = await response.json();
        setIsUserRegistered(true);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message); // `Error` type includes the `message` property
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    if (user && !isUserRegistered) {
      registerUser();
    }
  }, [user, isUserRegistered]);
  return (
    <>
      <Box sx={styles.outerBox}>
        <Container sx={styles.container}>
          <Box sx={styles.containerBox}>
            <Box mx={'auto'}>
              <Image src={'/Frame.svg'} alt='Nav Icon' height={80} width={80} />
            </Box>
            <Typography sx={styles.title}>
              <Box component={'span'} sx={styles.ownText}>
                Own{' '}
              </Box>
              Your Calling Card
            </Typography>
            <Box sx={styles.description}>
              <Typography>
                Create your personal bio page and publish for one price,
                forever.
              </Typography>
              <Typography>No subscriptions. No hidden fees.</Typography>
            </Box>
            {!user && (
              <Button sx={styles.farcasterConnectingButton} onClick={login}>
                <Image
                  src={'/FarcasterLogo.svg'}
                  alt='Icon'
                  width={25.86}
                  height={24}
                />
                Connect with Farcaster
              </Button>
            )}
          </Box>
          <Box>
            <Image
              src={'/HomeMainImage.svg'}
              alt='Main Image'
              height={640}
              width={1100}
              style={{ width: '100%', height: 'auto' }}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
}
