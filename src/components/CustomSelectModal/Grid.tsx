import { useEffect, useState } from 'react'

import { Group } from '@/services/groups'
import { Member } from '@/services/members'
import { getGroups } from '@/client/groups'
import { getMembers } from '@/client/members'

import Groups from './Groups'
import Members from './Members'

interface GridProps {
  handleSelection: (member: Member) => void
}

export default function SelectGrid({ handleSelection }: GridProps) {
  const [currentGender, setCurrentGender] = useState('boy')
  const [artistType, setArtistType] = useState('group')
  const [groups, setGroups] = useState<Group[]>([])
  const [currentGroup, setCurrentGroup] = useState<Group | null>(null)
  const [currentMembers, setCurrentMembers] = useState<Member[]>([])

  async function handleTypeSelection(gender: string, type: string) {
    setCurrentGender(gender)
    setArtistType(type)

    const groupData = await getGroups(type, gender)

    setGroups(groupData)
  }

  useEffect(() => {
    handleTypeSelection('boy', 'group')
  }, [])

  useEffect(() => {}, [currentGroup])

  const handleClick = async (group: Group) => {
    setCurrentGroup(group)

    const membersData = await getMembers(group.ticker ?? '')

    const tmpMembers = [
      {
        name: '선택 안 함',
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
              handleTypeSelection('all', 'solo')
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
        <Members
          currentMembers={currentMembers}
          handleSelection={handleSelection}
        />
      ) : (
        <Groups groups={groups} handleClick={handleClick} />
      )}
    </div>
  )
}
