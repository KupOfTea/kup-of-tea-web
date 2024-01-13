'use client'

import { PostHogProvider } from 'posthog-js/react'
import { OverlayProvider } from '@toss/use-overlay'
import React, { ReactNode } from 'react'
import { RecoilRoot } from 'recoil'
import { SWRConfig } from 'swr'

interface Props {
  children?: ReactNode
}

const options = {
  api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
}

export default function DefaultLayout({ children }: Props) {
  return (
    <PostHogProvider
      apiKey={process.env.NEXT_PUBLIC_POSTHOG_KEY}
      options={options}
    >
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
