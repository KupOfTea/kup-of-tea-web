'use client'

import { useOverlay } from '@toss/use-overlay'

import NavigationModal from '@/components/NavigationModal'

export default function Home() {
  const overlay = useOverlay()

  const openModal = () => {
    overlay.open(({ isOpen, close }) => (
      <NavigationModal isOpen={isOpen} close={close} />
    ))
  }

  return (
    <div className="flex flex-col items-center justify-center w-full px-5 py-10 min-h-screen bg-white">
      <div className="flex flex-col items-center space-y-1.5">
        <div className="font-semibold text-2xl text-base-600">
          <span>My </span>
          <span className="text-rose-500 text-4xl font-extrabold">K</span>
          <span>up Of Tea</span>
        </div>
        <span className="text-base-400 text-xs font-bold">
          K-POP 아이돌 취향표 생성기
        </span>
        <span className="py-3 text-sky-300 text-[10px] font-semibold">
          @DevvTyga
        </span>
      </div>
      <button
        onClick={() => openModal()}
        className="mt-40 mx-2 text-center text-lg font-extrabold py-3 w-full bg-black text-white shadow-sm rounded-full"
      >
        팀 선택하기
      </button>
    </div>
  )
}
