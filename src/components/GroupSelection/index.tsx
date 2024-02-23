'use client'

import { useRecoilValue } from 'recoil'

import { selectState } from '@/states/select'

import GroupList from './List'
import AppBar from './AppBar'
import RequestRouteList from './RequestRouteList'

export default function GroupSelection() {
  const selection = useRecoilValue(selectState)

  return (
    <div className="flex min-h-screen flex-col items-center bg-white">
      <AppBar />
      {selection.type === 'request' ? (
        <RequestRouteList />
      ) : (
        <GroupList gender={selection.gender} />
      )}
    </div>
  )
}
