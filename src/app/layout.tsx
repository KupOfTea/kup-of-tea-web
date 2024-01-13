import dynamic from 'next/dynamic'

import type { Metadata, Viewport } from 'next'
import './globals.css'
import DefaultLayout from '@/layouts/DefaultLayout'

import { PHProvider } from './providers'

const PostHogPageView = dynamic(() => import('./PostHogPageView'), {
  ssr: false,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://k-tea.club/'),
  title: 'K-POP 아이돌 취향표 생성기',
  description: '',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: 'https://k-tea.club/',
    title: 'K-POP 아이돌 취향표 생성기',
    description: '',
    images: [
      {
        url: 'https://k-tea.club/meta.png',
        width: 800,
        height: 400,
        alt: 'K-POP 아이돌 취향표 생성기',
      },
    ],
  },
  twitter: {
    creator: '@DevvTyga',
    card: 'summary_large_image',
    title: 'K-POP 아이돌 취향표 생성기',
    description: 'K-POP 아이돌 취향표 생성기',
    site: 'https://k-tea.club/',
    images: [
      {
        url: 'https://k-tea.club/meta.png',
        width: 800,
        height: 400,
        alt: 'K-POP 아이돌 취향표 생성기',
      },
    ],
  },
}

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  colorScheme: 'light',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <PHProvider>
        <body className="font-suite flex items-center justify-center min-h-screen bg-gray-100">
          <PostHogPageView />
          <div className="max-w-lg w-full">
            <DefaultLayout>{children}</DefaultLayout>
          </div>
        </body>
      </PHProvider>
    </html>
  )
}
