'use client';

import {
  CrossmintProvider,
  CrossmintAuthProvider,
} from '@crossmint/client-sdk-react-ui';

export default function Providers({ children }: { children: React.ReactNode }) {
  console.log(
    '🚀 ~ Providers ~ process.env.NEXT_PUBLIC_CROSSMINT_API_KEY:',
    process.env.NEXT_PUBLIC_CROSSMINT_API_KEY
  );

  return (
    <CrossmintProvider apiKey={process.env.NEXT_PUBLIC_CROSSMINT_API_KEY ?? ''}>
      <CrossmintAuthProvider
        embeddedWallets={{
          type: 'evm-smart-wallet',
          defaultChain: 'polygon-amoy',
          createOnLogin: 'all-users',
        }}
      >
        {children}
      </CrossmintAuthProvider>
    </CrossmintProvider>
  );
}
