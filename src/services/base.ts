import ky from 'ky-universal'

export const fetchAPI = ky.create({
  prefixUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const fetcher = (url: string) => fetch(url).then((r) => r.json())
