import Pages from '@/view/Pages';
import { cookies } from 'next/headers';

export default function Home() {
  const token = cookies().get('crossmint-jwt');
  const isAuthenticated = !!token;

  return <Pages isAuthenticated={isAuthenticated} />;
}
