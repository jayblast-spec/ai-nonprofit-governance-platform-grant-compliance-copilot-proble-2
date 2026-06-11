import './globals.css';
import type { Metadata } from 'next';
import AssistantWidget from '../components/AssistantWidget';

export const metadata: Metadata = {
  title: 'AI Nonprofit Governance Platform',
  description: 'Help professionals turn scheduling friction into a clear booking and availability workflow',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@600;700&family=JetBrains+Mono:wght@500&display=swap" rel="stylesheet" />
      </head>
      <body>{children}<AssistantWidget /></body>
    </html>
  );
}
