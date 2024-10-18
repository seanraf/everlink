import type { Metadata } from 'next';
import './globals.css';
import NavBar from '@/view/NavBar';
import Providers from '@/providers/provider';
import CrossmintProvider from '@/providers/Crossmint';

export const metadata: Metadata = {
  title: 'Everlink',
  description: 'Description about Everlink',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body suppressHydrationWarning={true}>
        <CrossmintProvider>
          <Providers>
            <NavBar />
            {children}
          </Providers>
        </CrossmintProvider>
      </body>
    </html>
  );
}
