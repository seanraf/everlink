'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { Box } from '@mui/material';
import LandingPage from './LandingPage';
import EverlinkPages from './EverlinkPages';
import { useAuth } from '@crossmint/client-sdk-react-ui';
import { useFrameContext } from '@/providers/FarcasterContextProvider';

export default function Pages({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const { user } = useAuth();
  const { context } = useFrameContext();

  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const isUserAuthenticated =
    isAuthenticated || user?.farcaster?.fid || context?.user?.fid;

  if (!showContent) {
    return (
      <Box
        sx={{
          width: '100%',
          height: 'calc(100vh - 144px)',
          display: 'flex',
        }}
      >
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

  return isUserAuthenticated ? <EverlinkPages /> : <LandingPage />;
}
