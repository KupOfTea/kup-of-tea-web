'use client'

import cx from 'classnames'
import { useRouter } from 'next/navigation'
import { useRecoilCallback } from 'recoil'

import { NINE_ITEMS } from '@/constants/question'
import { USER_LENGTH } from '@/constants/user'
import { answerState } from '@/states/answer'
import { userState } from '@/states/user'

interface Props {
  path: string
  title: string
  border: boolean
}

export default function CustomSelectionNavigationButton({
  path,
  title,
  border,
}: Props) {
  const classes = cx(
    'text-center text-lg font-extrabold py-5 w-full shadow-sm rounded-full',
    border
      ? 'bg-white text-black border-black border-2 '
      : 'bg-black text-white',
  )

  const router = useRouter()

  const resetAllAnswers = useRecoilCallback(
    ({ reset }) =>
      () => {
        if (path === 'single') {
          NINE_ITEMS.forEach((_, index) => {
            reset(answerState(`${path}-${index}`))
          })
        } else {
          Array.from({ length: USER_LENGTH }).forEach((_, userIndex) => {
            reset(userState(`u${userIndex}`))
            NINE_ITEMS.forEach((item, index) => {
              reset(answerState(`multi-u${userIndex}-${index}`))
            })
          })
        }
      },
    [path],
  ) // path가 변경될 때마다 이 콜백을 다시 생성

  const handleNavigation = () => {
    resetAllAnswers()
    router.push(`/custom/${path}`)
  }

  return (
    <button onClick={() => handleNavigation()} className={classes}>
      {title}
    </button>
  )
}
