import React, { ReactNode } from 'react'
import client from '@/client/base'

interface Props {
  children?: ReactNode
}

export const generateMetadata = async (parameter: any) => {
  const { params } = parameter
  const { ticker } = params

  const { data } = await client
    .from('teams')
    .select('name,logo')
    .eq('ticker', ticker)
    .single()

  if (data) {
    const { name, logo } = data

    return {
      metadataBase: new URL(`https://k-tea.club/${ticker}`),
      title: `${name} 취향표 생성기`,
      description: `${name} 취향표를 만들어 보세요.`,
      openGraph: {
        type: 'website',
        locale: 'ko_KR',
        url: `https://k-tea.club/${ticker}`,
        title: `${name} 취향표 생성기`,
        description: `${name} 취향표를 만들어 보세요.`,
        images: [
          {
            url: logo,
            width: 800,
            height: 400,
            alt: `${name} 취향표 생성기`,
          },
        ],
      },
      twitter: {
        creator: '@DevvTyga',
        card: 'summary_large_image',
        title: `${name} 취향표 생성기`,
        description: `${name} 취향표 생성기`,
        site: `https://k-tea.club/${ticker}`,
        images: [
          {
            url: logo,
            width: 800,
            height: 400,
            alt: `${name} 취향표 생성기`,
          },
        ],
      },
    }
  }
}

export default function TeamLayout({ children }: Props) {
  return <>{children}</>
}
