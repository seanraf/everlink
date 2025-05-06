import type { Metadata } from 'next';
import './globals.css';
import NavBar from '@/view/NavBar';
import Providers from '@/providers/provider';
import CrossmintProvider from '@/providers/Crossmint';
import FarcasterFrameProvider from '@/providers/FarcasterFrameProvider';
import { ContextProvider } from '@/providers/FarcasterContextProvider';

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
      <head>
        <meta
          name='fc:frame'
          content={`{
            "version": "next",
            "imageUrl": "https://i.ibb.co/B2V7ddyb/1200-628.png",
            "button": {
              "title": "Create your Everlink",
              "action": {
                "type": "launch_frame",
                "name": "Frame",
                "url": "https://create.myeverlink.app",
                "splashImageUrl": "https://i.ibb.co/35p2LBg0/Everlink.png",
                "splashBackgroundColor": "#131313"
              }
            }
          }`}
          data-rh='true'
        />
      </head>
      <body suppressHydrationWarning={true}>
        <CrossmintProvider>
          <Providers>
            <FarcasterFrameProvider>
              <ContextProvider>
                <NavBar />
                {children}
              </ContextProvider>
            </FarcasterFrameProvider>
          </Providers>
        </CrossmintProvider>
      </body>
    </html>
  );
}
