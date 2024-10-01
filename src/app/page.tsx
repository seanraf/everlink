'use client';

import { useAuth, useWallet } from '@crossmint/client-sdk-react-ui';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      <div className='absolute top-0 right-0 p-4'>
        <AuthButton />
      </div>
      <div className='flex items-center justify-center w-full h-full'>
        <Wallet />
      </div>
    </main>
  );
}

function AuthButton() {
  const { login, logout, jwt } = useAuth();

  return (
    <div>
      {jwt == null ? (
        <button
          type='button'
          onClick={login}
          className='bg-blue-500 text-white font-bold py-2 px-4 rounded'
        >
          Login
        </button>
      ) : (
        <button
          type='button'
          onClick={logout}
          className='bg-black text-white font-bold py-2 px-4 rounded border-2 border-blue-500'
        >
          Logout
        </button>
      )}
    </div>
  );
}

function Wallet() {
  const { wallet, status, error } = useWallet();

  return (
    <div>
      {status === 'loading-error' && error && (
        <div className='border-2 border-red-500 text-red-500 font-bold py-4 px-8 rounded-lg'>
          Error: {error.message}
        </div>
      )}
      {status === 'in-progress' && (
        <div className='border-2 border-yellow-500 text-yellow-500 font-bold py-4 px-8 rounded-lg'>
          Loading...
        </div>
      )}
      {status === 'loaded' && wallet && (
        <div className='border-2 border-green-500 text-green-500 font-bold py-4 px-8 rounded-lg'>
          Wallet: {wallet.address}
        </div>
      )}
      {status === 'not-loaded' && (
        <div className='border-2 border-gray-500 text-gray-500 font-bold py-4 px-8 rounded-lg'>
          Wallet not loaded
        </div>
      )}
    </div>
  );
}
