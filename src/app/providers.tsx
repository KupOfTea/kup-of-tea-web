'use client'

import { OverlayProvider } from '@toss/use-overlay'
import posthog from 'posthog-js'
import { PostHogProvider } from 'posthog-js/react'
import { RecoilRoot } from 'recoil'
import { SWRConfig } from 'swr'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: false,
  })
}

function PHProvider({ children }: { children: React.ReactNode }) {
  return <PostHogProvider client={posthog}>{children}</PostHogProvider>
}

function SWRProvider({ children }: { children: React.ReactNode }) {
  return <SWRConfig value={{ revalidateOnFocus: false }}>{children}</SWRConfig>
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PHProvider>
      <RecoilRoot>
        <SWRProvider>
          <OverlayProvider>{children}</OverlayProvider>
        </SWRProvider>
      </RecoilRoot>
    </PHProvider>
  )
}
