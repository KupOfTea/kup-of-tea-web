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
      className="w-full flex flex-col cursor-pointer items-center text-gray-900 text-[11px] font-medium"
    >
      <SkeletonImage
        className="object-contain object-center aspect-square w-10 h-10 my-5 tracking-[-6%]"
        src={getImageUrl(group.logo ?? '')}
        alt=""
        width={40}
        height={40}
      />
      <div>{group.name}</div>
    </button>
  )
}
