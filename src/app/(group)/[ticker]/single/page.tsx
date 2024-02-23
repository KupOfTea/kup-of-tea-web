'use client'

import { useParams } from 'next/navigation'

import { downloadImage } from '@/utils/downloadImage'

import BackButtonAppBar from '@/components/BackButtonAppBar'
import SingleCard from '@/components/SingleCard'

export default function SinglePage() {
  const { ticker } = useParams()

  return (
    <>
      <BackButtonAppBar title="1인용 취향표" />
      <SingleCard />
      <button
        onClick={() => downloadImage('card', ticker as string)}
        className="mt-5 mb-10 bg-black hover:bg-black text-white py-2 px-4 border border-transparent rounded-3xl shadow-sm text-sm font-semibold focus:ring-2 focus:ring-offset-2 focus:ring-black focus:outline-none"
      >
        다운로드
      </button>
    </>
  )
}
