'use client'

import { useRouter } from 'next/navigation'
import { Icon } from '@iconify/react'

import RequestForm from '@/containers/form'

export default function RequestFormPage() {
  const router = useRouter()
  return (
    <div className="flex flex-col w-full min-h-dvh h-full items-center bg-white">
      <div className="flex flex-col justify-center w-full bg-white px-4 py-4 border-b border-black border-opacity-5">
        <div className="flex flex-row w-full justify-between items-center">
          <div className="text-transparent">
            <Icon
              icon="streamline:interface-delete-1-remove-add-button-buttons-delete"
              width="13"
              height="13"
            />
          </div>
          <div className="text-center flex-grow text-base font-semibold text-grey-900 tracking-[-2%] leading-[20.8px]">
            팀 추가
          </div>
          <button
            onClick={() => router.push('/request')}
            className="text-black"
          >
            <Icon
              icon="streamline:interface-delete-1-remove-add-button-buttons-delete"
              width="13"
              height="13"
            />
          </button>
        </div>
      </div>
      <RequestForm />
    </div>
  )
}
