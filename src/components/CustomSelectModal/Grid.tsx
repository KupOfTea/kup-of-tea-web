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

  if (currentGroup && currentMembers) {
    return (
      <Members
        currentMembers={currentMembers}
        handleSelection={handleSelection}
      />
    )
  } else {
    return <Groups groups={groups} />
  }
}
