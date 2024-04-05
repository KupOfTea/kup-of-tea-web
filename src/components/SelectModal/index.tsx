'use client'

import { useParams } from 'next/navigation'
import { useRecoilValue } from 'recoil'

import { modalState } from '@/states/modal'
import { NINE_ITEMS } from '@/constants/question'
import { useMembers } from '@/services/members'
import MemberGrid from '@/containers/member'

interface Props {
  isOpen: boolean
  close: () => void
  userId?: string
  isCustomMode?: boolean
}

export default function SelectModal({
  isOpen,
  close,
  userId,
  isCustomMode = false,
}: Props) {
  const modal = useRecoilValue(modalState)
  const { ticker } = useParams() as { ticker: string }
  const { members, isLoading, isError } = useMembers(ticker)

  return (
    isOpen && (
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <button
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => close()}
        />
        <div className="absolute bottom-0 flex-col w-full h-fit max-h-[80%] max-w-lg overflow-y-scroll items-center justify-center bg-white rounded-t-[14px] shadow-lg">
          <div className="w-full flex flex-col items-center justify-center pt-3 pb-4">
            <div className="w-14 h-1 bg-black bg-opacity-10 rounded-full mb-4" />
            <span className="text-gray-900 text-[16px] font-bold tracking-[-2%] leading-[130%]">
              {NINE_ITEMS[modal.activeButtonIdx]}
            </span>
          </div>
          <div className="w-full mb-16 ">
            {isLoading && <p>Loading...</p>}
            {isError && <p>Loading failed</p>}
            {members && (
              <MemberGrid members={members} userId={userId} close={close} />
            )}
          </div>
        </div>
      </div>
    )
  )
}
