import { Metadata } from 'next'

interface Props {
  url: string
  title: string
  description: string
  imageUrl: string
  keywords: string[]
}

export const getMetadata = ({
  url,
  title,
  description,
  imageUrl,
  keywords,
}: Props): Metadata => {
  return {
    metadataBase: new URL(url),
    title,
    description,
    keywords,
    openGraph: {
      type: 'website',
      locale: 'ko_KR',
      url,
      title,
      description,
      images: [
        {
          url: imageUrl,
          secureUrl: imageUrl,
          width: 800,
          height: 400,
          alt: title,
        },
      ],
    },
    twitter: {
      creator: '@DevvTyga',
      card: 'summary_large_image',
      site: url,
      title,
      description,
      images: [
        {
          url,
          secureUrl: url,
          width: 800,
          height: 400,
          alt: title,
        },
      ],
    },
  }
}
