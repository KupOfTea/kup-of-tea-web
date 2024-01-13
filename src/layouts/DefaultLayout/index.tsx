'use client'

import { OverlayProvider } from '@toss/use-overlay'
import React, { ReactNode } from 'react'
import { RecoilRoot } from 'recoil'
import { SWRConfig } from 'swr'

interface Props {
  children?: ReactNode
}

export default function DefaultLayout({ children }: Props) {
  return (
    <RecoilRoot>
      <SWRConfig value={{ revalidateIfStale: false, revalidateOnFocus: false }}>
        <OverlayProvider>{children}</OverlayProvider>
      </SWRConfig>
    </RecoilRoot>
  )
}
