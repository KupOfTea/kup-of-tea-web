'use client'

import { useRecoilValue } from 'recoil'

import { selectState } from '@/states/select'

import TeamList from './List'
import AppBar from './AppBar'

export default function TeamSelection() {
  const selection = useRecoilValue(selectState)

  return (
    <div className="flex min-h-screen flex-col items-center bg-white">
      <AppBar />
      <TeamList gender={selection.gender} type={selection.type} />
    </div>
  )
}
