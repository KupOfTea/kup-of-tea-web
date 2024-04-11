import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import classNames from 'classnames'

import { Group } from '@/client/groups'
import { getImageUrl } from '@/shared/getImageUrl'

interface Props {
  group: Group
}

const GroupPage = ({ group }: Props) => {
  const router = useRouter()
  const [isSingleLoading, setIsSingleLoading] = useState(false)
  const [isMultipleLoading, setIsMultipleLoading] = useState(false)
  const { ticker } = useParams()

  const delay = async (ms: number | undefined) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }

  const toRoute = async (route: string) => {
    if (isSingleLoading || isMultipleLoading) {
      return
    }
    if (route.includes('multiple')) {
      setIsMultipleLoading(true)
    } else {
      setIsSingleLoading(true)
    }
    await delay(500)
    await delay(500)
    if (route.includes('multiple')) {
      setIsMultipleLoading(false)
    } else {
      setIsSingleLoading(false)
    }
    router.push(route)
  }

  return (
    <div className="flex flex-col w-full items-center h-full">
      {group?.logo ? (
        <img
          className="object-contain aspect-square w-40 mb-5"
          src={getImageUrl(group?.logo)}
          alt=""
          width={160}
          height={160}
        />
      ) : (
        <div className="object-cover aspect-square w-40 mb-5" />
      )}
      <div className="font-bold text-[24px] mb-16">{group?.name}</div>
      <div className="flex flex-col w-full">
        <button
          onClick={() => toRoute(`${ticker}/single`)}
          className={classNames(
            'transition-all duration-100 flex flex-col w-full items-start justify-start px-7 pt-6 h-[112px] border border-gray-300 rounded-md mb-2',
            isSingleLoading ? 'bg-gray-200' : 'bg-gray-50',
          )}
        >
          <div className="font-semibold text-[18px] text-gray-800">
            개인용 취향표 생성하기
          </div>
          <div className="text-start font-medium text-[12px] text-gray-400 mb-2">
            혼자만의 취향표를 만들어 공유해요.
          </div>
        </button>
        <button
          onClick={() => toRoute(`${ticker}/multiple`)}
          className={classNames(
            'transition-all duration-100 flex flex-col w-full items-start justify-start px-7 pt-6 h-[112px] border border-gray-300 rounded-md mb-2',
            isMultipleLoading ? 'bg-gray-200' : 'bg-gray-50',
          )}
        >
          <div className="font-semibold text-[18px] text-gray-800">
            다인용 취향표 생성하기
          </div>
          <div className="text-start font-medium text-[12px] text-gray-400 mb-4">
            여러 사람이 함께 취향표를 만들어 공유해요.
          </div>
        </button>
        <button
          className="underline text-gray-400 font-normal text-[13px] mb-3"
          onClick={() => router.push('/select')}
        >
          팀 다시 선택하기
        </button>
      </div>
    </div>
  )
}

export default GroupPage
