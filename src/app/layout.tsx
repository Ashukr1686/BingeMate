import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BingeMate | Ultimate TV Binge Calculator',
  description: 'Calculate exactly how long it takes to watch your favorite TV series back-to-back.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased bg-[#1B1B26] text-[#CFD8DC]">{children}</body>
    </html>
  );
}
