import React from "react"
import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"
import { NavigationTracker } from "@/components/navigation-tracker"
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: 'SQL Practice - Master SQL with Interactive Problems',
  description: 'Practice SQL queries in your browser with instant feedback. From basic SELECT statements to complex JOINs and subqueries. No setup required.',
  generator: 'v0.app',
  manifest: "/manifest.json", // This points to the generated manifest
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SQL Practice",
  },
  icons: {
    icon: [
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
    apple: '/icon.svg', // Ideally apple-touch-icon should be png, but svg works in some contexts or fallback
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`font-sans antialiased`}>
        <NavigationTracker />
        {children}
        <PWAInstallPrompt />
        <Analytics />
      </body>
    </html>
  )
}
