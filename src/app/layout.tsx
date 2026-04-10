
import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'theBinge | Binge Watch Calculator & TV Series Binge Planner',
  description: 'Use our TV binge time calculator to find out exactly how long to binge a show. Calculate total episodes runtime and plan your binge watch schedule with theBinge.',
  keywords: ['Binge calculator', 'Binge watch calculator', 'TV binge time calculator', 'Series binge calculator', 'Watch time calculator', 'How long to binge a show'],
  icons: {
    icon: '/bingemate.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-E4N70TG86C"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());

              gtag('config', 'G-E4N70TG86C');
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link 
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Bebas+Neue&display=swap" 
          crossOrigin="anonymous" 
        />
      </head>
      <body className="font-body antialiased bg-[#09090B] text-[#E2E8F0]">{children}</body>
    </html>
  );
}
