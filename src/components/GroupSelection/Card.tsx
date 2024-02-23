'use client'

import { useRouter } from 'next/navigation'

import { Group } from '@/client/groups'
import { getImageUrl } from '@/shared/getImageUrl'

import SkeletonImage from '../SkeletonImage'

interface Props {
  group: Group
}

export default function GroupCard({ group }: Props) {
  const router = useRouter()

  const handleClick = (item: Group) => {
    router.push(`/${item.ticker}`)
  }

  return (
    <button
      onClick={() => handleClick(group)}
      className="w-full flex flex-row py-4 px-5 cursor-pointer justify-between text-gray-900 text-base font-bold border-b border-base-200"
    >
      <div className="flex flex-row items-start justify-start space-x-2">
        <SkeletonImage
          className="object-contain object-center aspect-square w-6 h-6"
          src={getImageUrl(group.logo ?? '')}
          alt=""
          width={30}
          height={30}
        />
        <div>{group.name}</div>
      </div>
      <div>→</div>
    </button>
  )
}
