'use client'

import { downloadImage } from '@/utils/downloadImage'

import CustomBackButtonAppBar from '@/components/CustomBackButtonAppBar'
import CustomSelectionSingleCard from '@/components/CustomSelectionSingleCard'

export default function SinglePage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-white">
      <CustomBackButtonAppBar title="1인용 취향표" />
      <CustomSelectionSingleCard />
      <button
        onClick={() => downloadImage('card', 'custom')}
        className="mt-5 mb-10 bg-black hover:bg-black text-white py-2 px-4 border border-transparent rounded-3xl shadow-sm text-sm font-semibold focus:ring-2 focus:ring-offset-2 focus:ring-black focus:outline-none"
      >
        다운로드
      </button>
    </div>
  )
}
