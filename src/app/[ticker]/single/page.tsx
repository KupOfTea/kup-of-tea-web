'use client'
import BackButtonAppBar from '@/components/BackButtonAppBar'
import SingleCard from '@/components/SingleCard'
import { downloadImage } from '@/utils/downloadImage'
import { useParams } from 'next/navigation'

export default function SinglePage() {
  const { ticker } = useParams()
  return (
    <div className="flex min-h-screen flex-col items-center bg-white">
      <BackButtonAppBar title="1인용 취향표" />
      <SingleCard />
      <button
        onClick={() => downloadImage('card', ticker as string)}
        className="mt-5 mb-10 bg-black hover:bg-black text-white py-2 px-4 border border-transparent rounded-3xl shadow-sm text-sm font-semibold focus:ring-2 focus:ring-offset-2 focus:ring-black focus:outline-none"
      >
        다운로드
      </button>
    </div>
  )
}
