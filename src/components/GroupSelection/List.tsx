'use client'

import uuid from 'react-uuid'

import { useGroups } from '@/services/groups'

import GroupCard from './Card'

interface ListProps {
  gender: string
}

export default function GroupList({ gender }: ListProps) {
  const { groups, isLoading, isError } = useGroups(gender)

  return (
    <div className="my-5 w-full flex flex-col border-t border-base-200">
      {isLoading && <p>Loading...</p>}
      {isError && <p>Loading failed</p>}
      {groups &&
        groups.map((group) => {
          return <GroupCard key={uuid()} group={group} />
        })}
    </div>
  )
}
