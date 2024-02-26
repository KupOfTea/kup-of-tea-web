'use client'

import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useOverlay } from '@toss/use-overlay'
import classNames from 'classnames'
import { usePathname } from 'next/navigation'

import { modalState } from '@/states/modal'
import { NINE_ITEMS } from '@/constants/question'
import { answerState } from '@/states/answer'
import { generateAnswerKey } from '@/utils/generateAnswerKey'

import CustomSelectModal from '../CustomSelectModal'

interface Props {
  index: number
  userId?: string // optional, multiple 모드일 때만 필요함
}

export default function CustomSelectButton({ index, userId }: Props) {
  const overlay = useOverlay()
  const setModal = useSetRecoilState(modalState)

  const type = usePathname().split('/')[2]

  const answerKey = generateAnswerKey(index, type, userId)
  const answer = useRecoilValue(answerState(answerKey))

  const openModal = () => {
    setModal({
      activeButtonIdx: index,
    })
    overlay.open(({ isOpen, close }) => (
      <CustomSelectModal isOpen={isOpen} close={close} userId={userId} />
    ))
  }

  const titleClass = classNames(
    'font-extrabold text-black',
    type === 'single' ? 'text-sm' : 'text-[10px]',
  )

  const imageClass = classNames(
    'object-cover object-center rounded-sm aspect-square',
    type === 'multiple' ? 'w-10' : '',
  )

  return (
    <button
      onClick={() => openModal()}
      className="mx-1 mb-3 flex flex-col items-center space-y-2 cursor-pointer text-gray-600 hover:border-black hover:text-black justify-center"
    >
      <span className={titleClass}>{NINE_ITEMS[index]}</span>
      {answer?.artistMember?.profileImage && answer?.artistMember?.name ? (
        <img
          crossOrigin="anonymous"
          className={imageClass}
          src={`${answer?.artistMember?.profileImage}`}
          alt=""
          width={1000}
          height={1000}
        />
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
          />
        </svg>
      )}
    </button>
  )
}
