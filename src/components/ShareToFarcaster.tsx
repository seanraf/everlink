'use client';

import Image from 'next/image';
import { Button } from '@mui/material';
import { sdk } from '@farcaster/frame-sdk';

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
  const shareToWarpcast = async () => {
    try {
      const result = await sdk.actions.composeCast({
        text: customURL,
        embeds: ['https://i.ibb.co/B2V7ddyb/1200-628.png'], // Your image URL
      });

      console.log('Cast composed successfully:', result.cast.hash);
    } catch (error) {
      console.error('Failed to compose cast:', error);
      // Fallback for non-Farcaster environments
      window.open(
        `https://warpcast.com/~/compose?text=${encodeURIComponent(customURL)}&embeds[]=${encodeURIComponent('https://i.ibb.co/B2V7ddyb/1200-628.png')}`,
        '_blank'
      );
    }
    // const imageUrl = 'https://i.ibb.co/B2V7ddyb/1200-628.png';
    // const encodedImageUrl = encodeURIComponent(imageUrl);
    // const webUrl = `https://warpcast.com/~/compose?text=${customURL}&media=${encodedImageUrl}&embeds[]=${encodedImageUrl}`;
    // const chainUrl = `chain://compose?text=${encodeURIComponent(customURL)}&embeds[]=${encodedImageUrl}`;
    // window.location.href = chainUrl;
  };

  return (
    // <a
    //   href={shareToWarpcast()}
    //   target='_blank'
    //   rel='noopener noreferrer'
    //   style={{
    //     textDecoration: 'none',
    //     alignItems: 'center',
    //     display: 'flex',
    //   }}
    // >
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
    // </a>
  );
}
