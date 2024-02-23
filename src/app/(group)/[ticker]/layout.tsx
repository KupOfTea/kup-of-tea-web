import { ReactNode } from 'react'
import { Metadata } from 'next'

import { getImageUrl } from '@/shared/getImageUrl'
import { getGroup } from '@/client/groups'

interface Props {
  params: {
    ticker: string
  }
}

export async function generateMetadata({
  params: { ticker },
}: Props): Promise<Metadata> {
  const group = await getGroup(ticker)

  const url = `https://k-tea.love/${ticker}`
  const title = `${group?.name ?? ''} 취향표 생성기`
  const description = `${group?.name ?? ''} 취향표를 만들어 보세요.`

  return {
    metadataBase: new URL(url),
    title: title,
    description: description,
    openGraph: {
      type: 'website',
      locale: 'ko_KR',
      url: url,
      title: title,
      description: description,
      images: [
        {
          url: getImageUrl(group?.logo ?? ''),
          width: 800,
          height: 400,
          alt: title,
        },
      ],
    },
    twitter: {
      creator: '@DevvTyga',
      card: 'summary_large_image',
      title: title,
      description: title,
      site: url,
      images: [
        {
          url: getImageUrl(group?.logo ?? ''),
          width: 800,
          height: 400,
          alt: title,
        },
      ],
    },
  }
}

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center bg-white">
      {children}
    </div>
  )
}
