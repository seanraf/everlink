'use client';

import { PrivyProvider } from '@privy-io/react-auth';

export default function PrivyWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const privyAppId: string = process.env.NEXT_PUBLIC_PRIVY_APP_ID ?? '';
  return (
    <PrivyProvider
      appId={privyAppId}
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          theme: 'light',
          accentColor: '#676FFF',
          //   logo: '"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWblFuDT7YkVbBYlcz5PTLg0gZLmwZB0Wa_Q&s"',
        },
        loginMethods: ['farcaster'],
      }}
    >
      {children}
    </PrivyProvider>
  );
}
