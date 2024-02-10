'use client'

import { usePathname } from 'next/navigation'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { ArtistMember } from '@/types/artistMember'
import { modalState } from '@/states/modal'
import { NINE_ITEMS } from '@/constants/question'
import { answerState } from '@/states/answer'
import { generateAnswerKey } from '@/utils/generateAnswerKey'

import SelectGrid from './Grid'

interface Props {
  isOpen: boolean
  close: () => void
  userId?: string
}

export default function CustomSelectModal({ isOpen, close, userId }: Props) {
  const modal = useRecoilValue(modalState)

  const type = usePathname().split('/')[2]

  const answerKey = generateAnswerKey(modal.activeButtonIdx, type, userId)
  const setAnswer = useSetRecoilState(answerState(answerKey))

  const handleSelection = (member: ArtistMember) => {
    setAnswer({
      id: answerKey,
      artistMember: member,
    })
    close()
  }
  return (
    isOpen && (
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <button
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => close()}
        />
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
            <div className="mt-3 sm:flex">
              <div className="mt-2 text-start sm:ml-4 sm:text-left">
                <span className="mx-3 text-white bg-black px-3 py-1.5 rounded-2xl text-sm font-bold">
                  {NINE_ITEMS[modal.activeButtonIdx]}
                </span>
                <SelectGrid handleSelection={handleSelection} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  )
}
