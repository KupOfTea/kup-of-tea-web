import uuid from 'react-uuid'

import { Member } from '@/services/members'
import { getImageUrl } from '@/shared/getImageUrl'
import { NINE_ITEMS } from '@/constants/question'

import SkeletonImage from '../SkeletonImage'

interface Props {
  currentMembers: Member[]
  handleSelection: (member: Member) => void
  close(): void
  activeButtonIdx: number
}

export default function Members({
  currentMembers,
  handleSelection,
  close,
  activeButtonIdx,
}: Props) {
  return (
    <div className="fixed inset-0 z-10 overflow-y-auto max-w-lg items-center justify-center">
      <button
        className="fixed inset-0 w-full h-full bg-black opacity-40"
        onClick={() => close()}
      />
      <div className="fixed left-0 right-0 mx-auto bottom-0 flex-col w-full h-fit max-h-[80%] max-w-lg overflow-y-scroll bg-white rounded-t-[14px] shadow-lg">
        <div className="w-full flex flex-col items-center justify-center pt-3 pb-4">
          <div className="w-14 h-1 bg-black bg-opacity-10 rounded-full mb-4" />
          <span className="text-gray-900 text-[16px] font-bold tracking-[-2%] leading-[130%]">
            {NINE_ITEMS[activeButtonIdx]}
          </span>
        </div>
        <div className="w-full mb-16 ">
          <div className="grid grid-cols-3 px-5 gap-x-2 gap-y-7">
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
        </div>
      </div>
    </div>
  )
}
