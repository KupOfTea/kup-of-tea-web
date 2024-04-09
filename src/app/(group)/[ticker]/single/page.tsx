'use client'

import { useParams, useRouter } from 'next/navigation'
import { useRecoilValue } from 'recoil'
import classNames from 'classnames'

import { downloadImage } from '@/utils/downloadImage'
import { allSingleAnswersSelector } from '@/states/answer'

import SingleCard from '@/components/SingleCard'
import BackButtonAppBar from '@/components/BackButtonAppBar'

export default function SinglePage() {
  const { ticker } = useParams()
  const router = useRouter()
  const answers = useRecoilValue(allSingleAnswersSelector)

  const completed = !answers.some((e) => e.artistMember === null)

  return (
    <div className="flex flex-col w-full h-screen bg-[#FAFAFA]">
      <BackButtonAppBar title="개인용 취향표" />
      <SingleCard />
      <div className="bg-white fixed max-w-lg flex left-0 right-0 mx-auto bottom-0 w-full justify-center items-center py-3 px-5">
        <button
          onClick={() => downloadImage('card', ticker as string)}
          className={classNames(
            'w-full py-4 bg-black text-white font-semibold text-center text-[16px] rounded-[8px] tracking-[-2%] leading-[130%]',
            completed ? '' : 'bg-opacity-20',
          )}
        >
          다운로드
        </button>
      </div>
    </div>
  )
}
