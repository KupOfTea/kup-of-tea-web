import uuid from 'react-uuid'

import { Member } from '@/services/members'
import { getImageUrl } from '@/shared/getImageUrl'

import SkeletonImage from '../SkeletonImage'

interface Props {
  currentMembers: Member[]
  handleSelection: (member: Member) => void
}

export default function Members({ currentMembers, handleSelection }: Props) {
  return (
    <div className="grid grid-cols-3">
      {currentMembers.map((member) => {
        return (
          <button
            key={uuid()}
            onClick={() => handleSelection(member)}
            className="flex flex-col items-center p-4 space-y-2 cursor-pointer justify-center"
          >
            <SkeletonImage
              className="object-cover object-center rounded-md aspect-square mb-1"
              src={
                member.profileImage === '/empty.jpg'
                  ? member.profileImage
                  : getImageUrl(member?.profileImage ?? '')
              }
              alt={member.name ?? ''}
              width={300}
              height={300}
            />
            <p className="text-gray-900 text-sm font-semibold">{`${member.name}`}</p>
          </button>
        )
      })}
    </div>
  )
}
