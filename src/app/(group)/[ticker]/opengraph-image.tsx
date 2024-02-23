// https://stronglytyped.uk/articles/open-graph-images-nextjs-app-router#dynamic_images_with_dynamic_routes
// https://miriya.net/blog/MKkWLVdLpZo0tARvG8za

import { ImageResponse } from 'next/og'

import { getGroup } from '@/client/groups'
import { getImageUrl } from '@/shared/getImageUrl'

export const size = {
  width: 1200,
  height: 630,
}

interface Props {
  params: {
    ticker: string
  }
}

export default async function Image({ params: { ticker } }: Props) {
  try {
    const group = await getGroup(ticker)

    // const url = 'https://k-tea.love/fonts/SUITE-Heavy.otf'
    const url = 'http://localhost:3000/fonts/SUITE-Heavy.otf'

    const font = await fetch(new URL(url)).then((res) => res.arrayBuffer())

    return new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            height: '100%',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
            backgroundImage: 'linear-gradient(to bottom, #dbf4ff, #fff1f1)',
          }}
        >
          <img
            src={getImageUrl(group?.logo ?? '')}
            style={{
              height: 100,
              objectFit: 'cover',
              marginBottom: 50,
            }}
          />

          <div
            style={{
              fontFamily: 'SUITE',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              fontSize: '50px',
              color: '#000000',
              textAlign: 'center',
              letterSpacing: -2,
              fontWeight: 900,
            }}
          >
            <span>{group?.name ?? ''}</span>
            <span>취향표 만들기</span>
          </div>
        </div>
      ),
      {
        ...size,
        fonts: [
          {
            name: 'SUITE',
            data: font,
            weight: 900,
          },
        ],
      },
    )
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)
    return null
  }
}
