'use client';
import React from 'react';
import EverlinkPages from './EverlinkPages';
import LandingPage from './LandingPage';
import { useAuth } from '@crossmint/client-sdk-react-ui';
import { useFrameContext } from '@/providers/FarcasterContextProvider';

export default function Pages({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const { user } = useAuth();
  const { context } = useFrameContext();

  return (
    <>
      {isAuthenticated || user?.farcaster?.fid || context?.user?.fid ? (
        <EverlinkPages />
      ) : (
        <LandingPage />
      )}
    </>
  );
}
