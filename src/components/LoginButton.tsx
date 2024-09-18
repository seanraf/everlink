'use client';
import { usePrivy } from '@privy-io/react-auth';

export default function LoginButton() {
  const { ready, authenticated, login } = usePrivy();
  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);

  return (
    <>
      <button
        style={{
          padding: '10px 5px',
          fontSize: '18px',
          cursor: 'pointer',
          background: 'teal',
          border: '1px solid teal',
          borderRadius: '5px',
          width: '100px',
        }}
        disabled={disableLogin}
        onClick={login}
      >
        Log in
      </button>
    </>
  );
}
