'use client';

import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import Image from 'next/image';

const styles = {
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
};

export default function ShareToFarcaster({ customURL }: { customURL: string }) {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    setIsIOS(/iPad|iPhone|iPod/.test(navigator.userAgent));
  }, []);
  const shareToWarpcast = () => {
    const imageUrl = encodeURIComponent(
      'https://i.ibb.co/B2V7ddyb/1200-628.png'
    );
    const shareUrl = `https://warpcast.com/~/compose?text=${customURL}&media=${imageUrl}&embeds[]=${imageUrl}`;

    if (isIOS) {
      window.location.href = `warpcast://~/compose?text=${customURL}&media=${imageUrl}&embeds[]=${imageUrl}`;
      setTimeout(() => {
        window.location.href = shareUrl;
      }, 250);
    } else {
      window.open(shareUrl, '_blank');
    }
  };

  return (
    <Button
      variant='outlined'
      sx={styles.shareToFarcaster}
      onClick={shareToWarpcast}
    >
      <Image
        src={'/FarcasterPurpleLogo.svg'}
        alt='Icon'
        width={25.86}
        height={24}
      />
      Share To Farcaster Frame
    </Button>
  );
}
