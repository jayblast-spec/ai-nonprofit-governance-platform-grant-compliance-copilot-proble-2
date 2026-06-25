import './globals.css';
import type { Metadata } from 'next';
import AssistantWidget from '../components/AssistantWidget';

export const metadata: Metadata = {
  title: 'AI Nonprofit Governance Platform',
  description: 'Streamline grant compliance by extracting obligations from agreements and tracking reporting deadlines.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet" />
      </head>
      <body>{children}<AssistantWidget /></body>
    </html>
  );
}
