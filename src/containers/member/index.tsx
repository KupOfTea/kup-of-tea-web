'use client'

import { usePathname } from 'next/navigation'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import uuid from 'react-uuid'
import { useEffect, useState } from 'react'

import { modalState } from '@/states/modal'
import { answerState } from '@/states/answer'
import { generateAnswerKey } from '@/utils/generateAnswerKey'
import { Member } from '@/services/members'
import { getImageUrl } from '@/shared/getImageUrl'

import SkeletonImage from '@/components/SkeletonImage'

interface Props {
  members: Member[]
  userId?: string
  close: () => void
}

export default function MemberGrid({ members, userId, close }: Props) {
  const modal = useRecoilValue(modalState)
  const type = usePathname().split('/')[2]
  const answerKey = generateAnswerKey(modal.activeButtonIdx, type, userId)
  const setAnswer = useSetRecoilState(answerState(answerKey))
  const [memberList, setMemberList] = useState<Member[]>(members)

  const handleSelection = (member: Member) => {
    setAnswer({
      id: answerKey,
      artistMember: member,
    })
    close()
  }

  useEffect(() => {
    const tmpMembers = [
      {
        name: '선택 X',
        profileImage: '/empty.jpg',
      },
      ...members,
    ]

    setMemberList(tmpMembers)
  }, [members])

  return (
    <div className="grid grid-cols-3">
      {memberList.map((member) => {
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
                  : getImageUrl(member?.profileImage)
              }
              alt=""
              width={200}
              height={200}
            />
            <p className="text-gray-900 text-sm font-semibold">{`${member.name}`}</p>
          </button>
        )
      })}
    </div>
  )
}
