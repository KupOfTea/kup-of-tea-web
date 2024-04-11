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
      <div className="fixed left-0 right-0 mx-auto bottom-0 flex-col w-full h-full max-w-lg overflow-y-scroll">
        <SelectGrid
          close={close}
          handleSelection={handleSelection}
          activeButtonIdx={modal.activeButtonIdx}
        />
      </div>
    )
  )
}
