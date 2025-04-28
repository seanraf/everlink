'use client';

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
  const shareToWarpcast = () => {
    const imageUrl = 'https://i.ibb.co/B2V7ddyb/1200-628.png';
    const encodedImageUrl = encodeURIComponent(imageUrl);
    const webUrl = `https://warpcast.com/~/compose?text=${customURL}&media=${encodedImageUrl}&embeds[]=${encodedImageUrl}`;
    return webUrl;
  };

  return (
    <a
      href={shareToWarpcast()}
      target='_blank'
      rel='noopener noreferrer'
      style={{
        textDecoration: 'none',
        alignItems: 'center',
        display: 'flex',
      }}
    >
      <Button variant='outlined' sx={styles.shareToFarcaster}>
        <Image
          src={'/FarcasterPurpleLogo.svg'}
          alt='Icon'
          width={25.86}
          height={24}
        />
        Share To Farcaster Frame
      </Button>
    </a>
  );
}
