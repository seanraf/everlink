'use client';
import React from 'react';
import EverlinkPages from './EverlinkPages';
import LandingPage from './LandingPage';
import { useAuth } from '@crossmint/client-sdk-react-ui';

export default function Pages({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const { user } = useAuth();
  return (
    <>
      {isAuthenticated || user?.farcaster?.fid ? (
        <EverlinkPages />
      ) : (
        <LandingPage />
      )}
    </>
  );
}
