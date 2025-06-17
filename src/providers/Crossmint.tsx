'use client';

import {
  CrossmintProvider,
  CrossmintAuthProvider,
} from '@crossmint/client-sdk-react-ui';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CrossmintProvider apiKey={process.env.NEXT_PUBLIC_CROSSMINT_API_KEY ?? ''}>
      <CrossmintAuthProvider
{/*         embeddedWallets={{
          type: 'evm-smart-wallet',
          defaultChain: 'base-sepolia',
          createOnLogin: 'all-users',
        }} */}
        loginMethods={['farcaster']}
      >
        {children}
      </CrossmintAuthProvider>
    </CrossmintProvider>
  );
}
