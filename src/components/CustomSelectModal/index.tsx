'use client'

import { usePathname } from 'next/navigation'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import { modalState } from '@/states/modal'
import { answerState } from '@/states/answer'
import { generateAnswerKey } from '@/utils/generateAnswerKey'
import { Member } from '@/services/members'

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

  const handleSelection = (member: Member) => {
    setAnswer({
      id: answerKey,
      artistMember: member,
    })
    close()
  }
  return (
    isOpen && (
      // <div className="fixed inset-0 z-10 overflow-y-auto">
      //   <button
      //     className="fixed inset-0 w-full h-full bg-black opacity-40"
      //     onClick={() => close()}
      //   />
      //   <div className="flex items-center min-h-screen px-4 py-8">
      //     <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
      //       <div className="mt-3 sm:flex">
      //         <div className="mt-2 text-start sm:ml-4 sm:text-left"></div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      <div className="fixed left-0 right-0 mx-auto bottom-0 flex-col w-full h-full max-w-lg overflow-y-scroll bg-white">
        <SelectGrid handleSelection={handleSelection} />
      </div>
    )
  )
}
