'use client';
import React, { useEffect, useState } from 'react';
import LandingPage from './LandingPage';
import EverlinkPages from './EverlinkPages';
import { useAuth } from '@crossmint/client-sdk-react-ui';
import { useFrameContext } from '@/providers/FarcasterContextProvider';
import Loader from './Loader';

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
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const isUserAuthenticated =
    isAuthenticated || user?.farcaster?.fid || context?.user?.fid;

  if (!showContent) {
    return <Loader />;
  }

  return isUserAuthenticated ? <EverlinkPages /> : <LandingPage />;
}
