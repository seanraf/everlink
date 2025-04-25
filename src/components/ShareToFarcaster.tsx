'use client';

import { useState, useEffect } from 'react';
import { Button, Typography } from '@mui/material';
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
    const imageUrl = 'https://i.ibb.co/B2V7ddyb/1200-628.png';
    const encodedImageUrl = encodeURIComponent(imageUrl);
    const webUrl = `https://warpcast.com/~/compose?text=${customURL}&media=${encodedImageUrl}&embeds[]=${encodedImageUrl}`;
    const deepLinkUrl = `warpcast://~/compose?text=${customURL}&embeds[]=${encodedImageUrl}`;

    // if (isIOS) {
    //   window.location.href = deepLinkUrl;
    //   setTimeout(() => {
    //     if (!document.hidden) {
    //       window.location.href = webUrl;
    //     }
    //   }, 500);
    // } else {
    //   window.open(webUrl, '_blank');
    // }
    return webUrl;
  };

  return (
    <>
      <Typography>IOS detected : {isIOS}</Typography>
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
    </>
  );
}
