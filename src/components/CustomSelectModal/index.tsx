'use client'

import { useQuery } from '@supabase-cache-helpers/postgrest-swr'
import { usePathname } from 'next/navigation'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import Image from 'next/image'
import uuid from 'react-uuid'
import { useState } from 'react'

import client from '@/client/base'
import { ArtistMember } from '@/types/artistMember'
import { modalState } from '@/states/modal'
import { convertObjectKeysToCamelCase } from '@/utils/camelCase'
import { NINE_ITEMS } from '@/constants/question'
import { answerState } from '@/states/answer'
import { generateAnswerKey } from '@/utils/generateAnswerKey'
import { TeamWithId } from '@/types/team'

interface Props {
  isOpen: boolean
  close: () => void
  userId?: string
}

export default function CustomSelectModal({ isOpen, close, userId }: Props) {
  const modal = useRecoilValue(modalState)

  const type = usePathname().split('/')[2]

  const answerKey = generateAnswerKey(modal.activeButtonIdx, type, userId)
  const setAnswer = useSetRecoilState(answerState(answerKey))

  const { data } = useQuery(
    client
      .from('teams')
      .select(`id, name, ticker, logo`)
      .order('name', { ascending: true }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  const teams: TeamWithId[] = data || []

  const [currentTeam, setCurrentTeam] = useState<TeamWithId | null>(null)
  const [currentArtistMembers, setCurrentArtistMembers] = useState<
    ArtistMember[]
  >([])

  const handleClick = async (team: TeamWithId) => {
    setCurrentTeam(team)

    const { data: artistData } = await client
      .from('artist_members')
      .select(`id, name, profile_image`)
      .eq('team_id', team.id)
      .order('id', { ascending: true })

    const artistMembersRaw = artistData || []
    const artistMembers: ArtistMember[] = convertObjectKeysToCamelCase(
      artistMembersRaw,
    ) as unknown as ArtistMember[]

    const emptyArtistMember: ArtistMember = {
      id: 0,
      name: '선택 X',
      profileImage: 'https://k-tea.love/empty.jpg',
    } as ArtistMember

    setCurrentArtistMembers([emptyArtistMember, ...artistMembers] || [])
  }

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
                {currentTeam && currentArtistMembers ? (
                  <div className="grid grid-cols-3">
                    {currentArtistMembers.map((member) => {
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
                ) : (
                  <div className="grid grid-cols-4 py-2">
                    {teams.map((team) => {
                      return (
                        <button
                          key={uuid()}
                          onClick={() => handleClick(team)}
                          className="flex flex-col items-center p-4 space-y-2 cursor-pointer justify-center"
                        >
                          <Image
                            className="object-contain object-center aspect-square mb-1"
                            src={`${team.logo}`}
                            alt=""
                            width={1000}
                            height={1000}
                          />
                          <p className="text-gray-900 text-[7px] font-semibold">{`${team.name}`}</p>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  )
}
