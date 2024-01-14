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
import { answerState } from '@/states/answer'
import { generateAnswerKey } from '@/utils/generateAnswerKey'

interface Props {
  isOpen: boolean
  close: () => void
  userId?: string
}

export default function SelectModal({ isOpen, close, userId }: Props) {
  const modal = useRecoilValue(modalState)

  const type = usePathname().split('/')[2]

  const answerKey = generateAnswerKey(modal.activeButtonIdx, type, userId)
  const setAnswer = useSetRecoilState(answerState(answerKey))
  const { ticker } = useParams()

  const { data } = useQuery(
    client
      .from('teams')
      .select(`artist_members(id, name, profile_image)`)
      .eq('ticker', ticker)
      .order('id', { referencedTable: 'artist_members', ascending: true }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )


  const artistMembersRaw = data?.[0]?.artist_members || []
  const artistMembers: ArtistMember[] = convertObjectKeysToCamelCase(
    artistMembersRaw,
  ) as unknown as ArtistMember[]

  const handleSelection = (member: ArtistMember) => {
    setAnswer({
      id: answerKey,
      artistMember: member,
    })
    close()
  }

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
                <div className="grid grid-cols-3">
                  {artistMembers.map((member, idx) => {
                    return (
                      <button
                        key={uuid()}
                        onClick={() => handleSelection(member)}
                        className="flex flex-col items-center p-4 space-y-2 cursor-pointer justify-center"
                      >
                        <Image
                          className="object-cover object-center rounded-md aspect-square mb-1"
                          src={`${member.profileImage}`}
                          alt=""
                          width={1000}
                          height={1000}
                        />
                        <p className="text-gray-900 text-sm font-semibold">{`${member.name}`}</p>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  )
}
