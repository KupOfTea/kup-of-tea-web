'use client'
import { NINE_ITEMS } from '@/constants/question'
import { USER_LENGTH } from '@/constants/user'
import { answerState } from '@/states/answer'
import { userState } from '@/states/user'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { useRecoilCallback } from 'recoil'

interface Props {
  title: string
}

export default function BackButtonAppBar({ title }: Props) {
  const router = useRouter()
  const { ticker } = useParams()
  const type = usePathname().split('/')[2]

  const resetAllAnswers = useRecoilCallback(
    ({ reset }) =>
      () => {
        if (type === 'single') {
          NINE_ITEMS.forEach((_, index) => {
            reset(answerState(`${type}-${index}`))
          })
        } else {
          Array.from({ length: USER_LENGTH }).forEach((_, userIndex) => {
            reset(userState(`u${userIndex}`))
            NINE_ITEMS.forEach((_, index) => {
              reset(answerState(`multi-u${userIndex}-${index}`))
            })
          })
        }
      },
    [type],
  ) // type이 변경될 때마다 이 콜백을 다시 생성

  const handleBack = () => {
    resetAllAnswers()
    router.push(`/${ticker}`)
  }

  return (
    <div className="flex flex-row justify-between items-center mb-10 w-full bg-white border-b-[1.2px] border-base-300 h-12 px-4">
      <button
        onClick={() => handleBack()}
        className="text-xl text-secondaryForeground font-medium"
      >
        ←
      </button>
      <div className="text-center flex-grow text-[14px] font-extrabold text-grey-900">
        {title}
      </div>
      <div className="text-xl text-transparent font-medium">←</div>
    </div>
  )
}
