'use client';

import LoginButton from '@/components/LoginButton';
import LogoutButton from '@/components/LogoutButton';
import { usePrivy } from '@privy-io/react-auth';

export default function Home() {
  const { ready, authenticated, user } = usePrivy();

  // Wait until the Privy client is ready before taking any actions
  if (!ready) {
    return null;
  }

  if (ready && !authenticated) {
    // Replace this code with however you'd like to handle an unauthenticated user
    // As an example, you might redirect them to a login page
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <LoginButton />
      </div>
    );
  }

  if (ready && authenticated) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          height: '100vh',
        }}
      >
        <p>Hi {user?.farcaster?.displayName}.</p>
        <br />
        <p> {user?.farcaster?.bio}.</p>
        <br />

        <LogoutButton />
      </div>
    );
  }
}
