'use client'

import { useRecoilValue } from 'recoil'

import { selectState } from '@/states/select'

import GroupList from './List'
import AppBar from './AppBar'

export default function GroupSelection() {
  const selection = useRecoilValue(selectState)

  return (
    <div className="flex min-h-dvh h-full flex-col items-center bg-white">
      <AppBar />
      <GroupList type={selection.type} gender={selection.gender} />
    </div>
  )
}
