'use client'

import { Group } from '@/client/groups'
import { getImageUrl } from '@/shared/getImageUrl'

import SkeletonImage from '../SkeletonImage'

interface Props {
  group: Group
  handleClick: (group: Group) => Promise<void>
}

export default function GroupCard({ group, handleClick }: Props) {
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
