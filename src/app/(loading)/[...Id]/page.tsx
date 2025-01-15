'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { Box, Skeleton, Typography } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';

const styles = {
  containerBox: {
    backgroundImage: "url('/LandingBackground.png')",
    backgroundRepeat: 'round',
    display: 'flex',
  },
  mainBox: {
    display: 'flex',
    width: '90%',
    mx: 'auto',
    flexDirection: 'column',
    alignItems: 'center',
    my: 'auto',
    pt: { md: 15, xs: 10 },
    gap: 3,
  },
  textBox: {
    textAlign: 'center',
    '& .MuiTypography-root': { color: '#23343A' },
    width: { md: '70%', sm: '85%' },
    gap: 2,
    display: 'flex',
    flexDirection: 'column',
  },
  previewDemoContainer: {
    '& .MuiTypography-root': {
      fontFamily: 'Redacted',
    },
    borderRadius: '16px',
    textAlign: 'center',
    p: { md: 3, xs: 1.5 },
    width: { lg: '30%', md: '40%', sm: '50%', xs: '100%' },
    my: 3,
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  buttonOuterBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: { md: 2, xs: 1.5 },
  },
  buttonBoxDark: {
    borderRadius: '8px',
    bgcolor: 'primary.contrastText',
  },
  buttonBoxLight: {
    borderRadius: '8px',
    bgcolor: 'dark.main',
  },
};
export default function Page() {
  const [id, setId] = useState<string | undefined>('');
  const [deploymentRecord, setDeploymentRecord] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const pathname = usePathname();
  const router = useRouter();
  const backendBaseUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL as string;

  const fetchDeploymentData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${backendBaseUrl}/api/deploymentHistory/${id}`
      );
      const deploymentRecords = response.data.records;
      if (deploymentRecords) {
        setDeploymentRecord(deploymentRecords);
        const latestLink = deploymentRecords?.customUrl;
        if (deploymentRecords?.deployed) {
          router.push(latestLink);
        }
      } else {
        console.error('No deployment records found.');
      }
    } catch (error) {
      console.error('Error retrieving deployment data:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (pathname) {
      const pathId = pathname.split('/').pop();
      setId(pathId);
    }
  }, [pathname]);

  useEffect(() => {
    if (id) {
      fetchDeploymentData();
    }
  }, [id]);

  return (
    <Box bgcolor={'#F9FAFB'} margin={0} minHeight={'calc(100vh - 72px)'}>
      <Box sx={styles.containerBox}>
        {!loading ? (
          <>
            {deploymentRecord?.taskId ? (
              <Box sx={styles.mainBox}>
                <Box sx={styles.textBox}>
                  <Typography fontSize={{ md: 16, xs: 14 }}>
                    We’re writing your Everlink to the web in permanent link.
                    This may take up to 30 minutes, but what’s 30 minutes for
                    something that lasts forever?
                  </Typography>
                  <Image
                    src={'/loader.gif'}
                    alt='Loader'
                    width={60}
                    height={60}
                    style={{ marginLeft: 'auto', marginRight: 'auto' }}
                  />
                  <Typography fontSize={{ md: 18, xs: 16 }}>
                    Refresh anytime to check its status!
                  </Typography>
                </Box>
                <Box
                  sx={{
                    ...styles.previewDemoContainer,
                    bgcolor: 'white',
                  }}
                >
                  <Skeleton
                    variant='rounded'
                    width={'40%'}
                    height={30}
                    sx={{ borderRadius: 2, mx: 'auto', mt: 1 }}
                  />
                  <Skeleton
                    variant='rounded'
                    width={'80%'}
                    height={36}
                    sx={{ borderRadius: 2, mt: 0.2, mx: 'auto' }}
                  />
                  <Box sx={styles.buttonOuterBox}>
                    {Array.from({ length: 6 }).map((_, index) => (
                      <Box
                        key={index}
                        sx={{
                          ...styles.buttonBoxDark,
                        }}
                      >
                        <Skeleton
                          variant='rounded'
                          width={'100%'}
                          height={55}
                          sx={{ borderRadius: 2 }}
                        />
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            ) : (
              <Box height={'calc(100vh - 72px)'} m={'auto'} display={'flex'}>
                <Box my={'auto'}>No Record Found</Box>
              </Box>
            )}
          </>
        ) : (
          <Box height={'calc(100vh - 80px)'} m={'auto'} display={'flex'}>
            <Image
              src={'/loader.gif'}
              alt='Loader'
              width={60}
              height={60}
              style={{
                marginTop: 'auto',
                marginBottom: 'auto',
                height: '60px',
              }}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
