import { useEffect, useState } from 'react'
import { useRecoilState } from 'recoil'

import { Group } from '@/services/groups'
import { Member } from '@/services/members'
import { getMembers } from '@/client/members'
import { selectState } from '@/states/select'

import Groups from './Groups'
import Members from './Members'

interface GridProps {
  handleSelection: (member: Member) => void
  close(): void
  activeButtonIdx: number
}

export default function SelectGrid({
  handleSelection,
  close,
  activeButtonIdx,
}: GridProps) {
  const [currentGroup, setCurrentGroup] = useState<Group | null>(null)
  const [currentMembers, setCurrentMembers] = useState<Member[]>([])
  const [selection, setSelection] = useRecoilState(selectState)

  useEffect(() => {
    setSelection({
      gender: 'boy',
      type: 'group',
      title: '보이그룹',
    })
  }, [])

  useEffect(() => {}, [currentGroup])

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

  return currentGroup && currentMembers ? (
    <Members
      currentMembers={currentMembers}
      handleSelection={handleSelection}
      close={close}
      activeButtonIdx={activeButtonIdx}
    />
  ) : (
    <Groups close={close} handleClick={handleClick} />
  )
}
