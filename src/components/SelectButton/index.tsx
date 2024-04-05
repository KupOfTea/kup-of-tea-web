'use client'

import { useRecoilValue, useSetRecoilState } from 'recoil'
import { useOverlay } from '@toss/use-overlay'
import classNames from 'classnames'
import { usePathname } from 'next/navigation'

import { modalState } from '@/states/modal'
import { NINE_ITEMS } from '@/constants/question'
import { answerState } from '@/states/answer'
import { generateAnswerKey } from '@/utils/generateAnswerKey'
import { getImageUrl } from '@/shared/getImageUrl'

import SelectModal from '../SelectModal'

interface Props {
  index: number
  userId?: string // optional, multiple 모드일 때만 필요함
}

export default function SelectButton({ index, userId }: Props) {
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
      <SelectModal isOpen={isOpen} close={close} userId={userId} />
    ))
  }

  const titleClass = classNames(
    'font-extrabold text-black',
    type === 'single' ? 'text-sm' : 'text-[10px]',
  )

  const imageClass = classNames(
    'object-cover object-center rounded-sm aspect-square my-1',
    type === 'multiple' ? 'w-10' : 'w-full',
  )

  return (
    <button
      onClick={() => openModal()}
      className="w-full flex flex-col items-stretch text-center cursor-pointer justify-center"
    >
      {answer?.artistMember?.profileImage && answer?.artistMember?.name ? (
        <img
          className={imageClass}
          src={
            answer?.artistMember?.profileImage === '/empty.jpg'
              ? answer?.artistMember?.profileImage
              : getImageUrl(answer?.artistMember?.profileImage ?? '')
          }
          alt={answer?.artistMember?.name ?? ''}
          width={100}
          height={100}
        />
      ) : (
        <div className="aspect-square flex items-center justify-center w-full my-1 bg-black bg-opacity-5 rounded-sm">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            viewBox="0 0 25 25"
            fill="none"
          >
            <g clipPath="url(#clip0_1_194)">
              <circle opacity="0.4" cx="12.5" cy="12.5" r="12" fill="white" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24.5 12.5C24.5 19.1274 19.1274 24.5 12.5 24.5C5.87259 24.5 0.5 19.1274 0.5 12.5C0.5 5.87259 5.87259 0.5 12.5 0.5C19.1274 0.5 24.5 5.87259 24.5 12.5ZM12.5 6.07143C13.2101 6.07143 13.7857 6.64707 13.7857 7.35714V11.2143H17.6429C18.3529 11.2143 18.9286 11.7899 18.9286 12.5C18.9286 13.2101 18.3529 13.7857 17.6429 13.7857H13.7857V17.6429C13.7857 18.3529 13.2101 18.9286 12.5 18.9286C11.7899 18.9286 11.2143 18.3529 11.2143 17.6429V13.7857H7.35714C6.64707 13.7857 6.07143 13.2101 6.07143 12.5C6.07143 11.7899 6.64707 11.2143 7.35714 11.2143H11.2143V7.35714C11.2143 6.64707 11.7899 6.07143 12.5 6.07143Z"
                fill="black"
                fillOpacity="0.15"
              />
            </g>
            <defs>
              <clipPath id="clip0_1_194">
                <rect
                  width="24"
                  height="24"
                  fill="white"
                  transform="translate(0.5 0.5)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
      )}
      <span className="w-full text-center text-xs font-semibold tracking-[-2%] leading-[130%] mt-1">
        {NINE_ITEMS[index]}
      </span>
    </button>
  )
}
