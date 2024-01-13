'use client'

import posthog from 'posthog-js'
import { PostHogProvider, usePostHog } from 'posthog-js/react'
import { OverlayProvider } from '@toss/use-overlay'
import React, { ReactNode, useEffect } from 'react'
import { RecoilRoot } from 'recoil'
import { SWRConfig } from 'swr'
import { usePathname, useSearchParams } from 'next/navigation'

if (typeof window !== 'undefined') {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    capture_pageview: false, // Disable automatic pageview capture, as we capture manually
  })
}

interface Props {
  children?: ReactNode
}

export default function DefaultLayout({ children }: Props) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()

  // Track pageviews
  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`
      }
      posthog.capture('$pageview', {
        $current_url: url,
      })
    }
  }, [pathname, searchParams, posthog])

  return (
    <PostHogProvider client={posthog}>
      <RecoilRoot>
        <SWRConfig
          value={{ revalidateIfStale: false, revalidateOnFocus: false }}
        >
          <OverlayProvider>{children}</OverlayProvider>
        </SWRConfig>
      </RecoilRoot>
    </PostHogProvider>
  )
}
