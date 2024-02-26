'use client'

import uuid from 'react-uuid'
import { useEffect, useState } from 'react'

import { Group } from '@/services/groups'
import { Member } from '@/services/members'
import { getGroups } from '@/client/groups'
import { getMembers } from '@/client/members'
import { getImageUrl } from '@/shared/getImageUrl'

import SkeletonImage from '../SkeletonImage'

interface GridProps {
  handleSelection: (member: Member) => void
}

export default function SelectGrid({ handleSelection }: GridProps) {
  const [currentGender, setCurrentGender] = useState('boy')
  const [artistType, setArtistType] = useState('group')
  const [groups, setGroups] = useState<Group[]>([])
  const [currentGroup, setCurrentGroup] = useState<Group | null>(null)
  const [currentMembers, setCurrentMembers] = useState<Member[]>([])

  async function handleTypeSelection(type: string, gender: string) {
    setCurrentGender(gender)
    setArtistType(type)

    const groupData = await getGroups(type, gender)

    setGroups(groupData)
  }

  useEffect(() => {
    handleTypeSelection('boy', 'group')
  }, [])

  const handleClick = async (group: Group) => {
    setCurrentGroup(group)

    const membersData = await getMembers(group.ticker ?? '')

    const tmpMembers = [
      {
        name: '선택 X',
        profileImage: '/empty.jpg',
      },
      ...membersData,
    ]

    setCurrentMembers(tmpMembers)
  }

  return (
    <div className="flex flex-col w-full">
      {currentGroup == null && (
        <div className="py-2 mx-3 flex flex-row items-center text-sm my-2">
          <button
            onClick={() => {
              handleTypeSelection('boy', 'group')
            }}
            className="flex flex-col items-center font-bold max-w-fit px-1"
          >
            <div className={currentGender !== 'boy' ? 'text-gray-500' : ''}>
              보이그룹
            </div>
            <div
              className={
                currentGender === 'boy'
                  ? 'mt-1.5 w-4/5 h-0.5 bg-black rounded-full'
                  : 'mt-1.5 w-4/5 h-0.5 none rounded-full'
              }
            />
          </button>
          <button
            onClick={() => {
              handleTypeSelection('girl', 'group')
            }}
            className="flex flex-col items-center font-bold max-w-fit px-1"
          >
            <div className={currentGender !== 'girl' ? 'text-gray-500' : ''}>
              걸그룹
            </div>
            <div
              className={
                currentGender === 'girl'
                  ? 'mt-1.5 w-4/5 h-0.5 bg-black rounded-full'
                  : 'mt-1.5 w-4/5 h-0.5 none rounded-full'
              }
            />
          </button>
          <button
            onClick={() => {
              handleTypeSelection('', 'solo')
            }}
            className="flex flex-col items-center font-bold max-w-fit px-1"
          >
            <div className={artistType !== 'solo' ? 'text-gray-500' : ''}>
              솔로
            </div>
            <div
              className={
                artistType === 'solo'
                  ? 'mt-1.5 w-4/5 h-0.5 bg-black rounded-full'
                  : 'mt-1.5 w-4/5 h-0.5 none rounded-full'
              }
            />
          </button>
        </div>
      )}
      {currentGroup && currentMembers ? (
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
                  src={member.profileImage || ''}
                  alt={member.name || ''}
                  width={300}
                  height={300}
                />
                <p className="text-gray-900 text-sm font-semibold">{`${member.name}`}</p>
              </button>
            )
          })}
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-3">
          {groups.map((group) => {
            return (
              <button
                key={uuid()}
                onClick={() => handleClick(group)}
                className="flex flex-col items-center space-y-3 cursor-pointer justify-center"
              >
                <SkeletonImage
                  className="object-contain object-center w-8 h-8 aspect-square"
                  src={getImageUrl(group.logo ?? '')}
                  alt={group.name ?? ''}
                  width={100}
                  height={100}
                />
                <p className="text-gray-900 text-[8px] font-semibold">{`${group.name}`}</p>
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
