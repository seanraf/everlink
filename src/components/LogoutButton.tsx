import { usePrivy } from '@privy-io/react-auth';

export default function LogoutButton() {
  const { ready, authenticated, logout } = usePrivy();
  // Disable logout when Privy is not ready or the user is not authenticated
  const disableLogout = !ready || (ready && !authenticated);

  return (
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
      disabled={disableLogout}
      onClick={logout}
    >
      Log out
    </button>
  );
}
