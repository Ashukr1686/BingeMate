import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'BingeMate | Binge Watch Calculator & TV Series Binge Planner',
  description: 'Use our TV binge time calculator to find out exactly how long to binge a show. Calculate total episodes runtime and plan your binge watch schedule with our commitment tool.',
  keywords: ['Binge calculator', 'Binge watch calculator', 'TV binge time calculator', 'Series binge calculator', 'Watch time calculator', 'How long to binge a show'],
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
