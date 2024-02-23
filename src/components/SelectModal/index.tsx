'use client'

import { useQuery } from '@supabase-cache-helpers/postgrest-swr'
import { useParams, usePathname } from 'next/navigation'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import Image from 'next/image'
import uuid from 'react-uuid'

import client from '@/client/base'
import { ArtistMember } from '@/types/artistMember'
import { modalState } from '@/states/modal'
import { convertObjectKeysToCamelCase } from '@/utils/camelCase'
import { NINE_ITEMS } from '@/constants/question'

import { Member, useMembers } from '@/services/members'

import MemberGrid from '@/containers/member'

interface Props {
  isOpen: boolean
  close: () => void
  userId?: string
  isCustomMode?: boolean
}

export default function SelectModal({
  isOpen,
  close,
  userId,
  isCustomMode = false,
}: Props) {
  const modal = useRecoilValue(modalState)
  const { ticker } = useParams() as { ticker: string }
  const { members, isLoading, isError } = useMembers(ticker)

  return (
    isOpen && (
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <button
          className="fixed inset-0 w-full h-full bg-black opacity-40"
          onClick={() => close()}
        />
        <div className="flex items-center min-h-screen px-4 py-8">
          <div className="relative w-full max-w-lg p-4 mx-auto bg-white rounded-md shadow-lg">
            <div className="mt-3 sm:flex">
              <div className="mt-2 text-start sm:ml-4 sm:text-left">
                <span className="mx-3 text-white bg-black px-3 py-1.5 rounded-2xl text-sm font-bold">
                  {NINE_ITEMS[modal.activeButtonIdx]}
                </span>
                {isLoading && <p>Loading...</p>}
                {isError && <p>Loading failed</p>}
                {members && <MemberGrid members={members} userId={userId} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  )
}
