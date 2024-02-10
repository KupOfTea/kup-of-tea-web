'use client'

import Image from 'next/image'
import uuid from 'react-uuid'
import { useEffect, useState } from 'react'

import client from '@/client/base'
import { ArtistMember } from '@/types/artistMember'
import { TeamWithId } from '@/types/team'
import { convertObjectKeysToCamelCase } from '@/utils/camelCase'

interface GridProps {
  handleSelection: (member: ArtistMember) => void
}

export default function SelectGrid({ handleSelection }: GridProps) {
  const [currentGender, setCurrentGender] = useState('boy')
  const [artistType, setArtistType] = useState('group')
  const [teams, setTeams] = useState<TeamWithId[]>([])
  const [currentTeam, setCurrentTeam] = useState<TeamWithId | null>(null)
  const [currentArtistMembers, setCurrentArtistMembers] = useState<
    ArtistMember[]
  >([])

  async function handleTypeSelection(gender: string, type: string) {
    setCurrentGender(gender)
    setArtistType(type)

    const { data: teamData } = await client
      .from('teams')
      .select('id, name, ticker, logo')
      .eq('type', type)
      .like('gender', `%${gender}%`)
      .order('agency_id', { ascending: true })
      .order('name', { ascending: true })

    const teamList: TeamWithId[] = teamData || []
    setTeams(teamList)
  }

  useEffect(() => {
    handleTypeSelection('boy', 'group')
  }, [])

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
      profileImage: '/empty.jpg',
    } as ArtistMember

    setCurrentArtistMembers([emptyArtistMember, ...artistMembers] || [])
  }

  return (
    <div className="flex flex-col w-full">
      {currentTeam == null && (
        <div className="py-2 mx-3 flex flex-row items-center text-sm my-2">
          <button
            onClick={() => {
              handleTypeSelection('boy', 'group')
            }}
            className="flex flex-col items-center font-bold max-w-fit px-1"
          >
            <div className={currentGender !== 'boy' ? 'text-gray-500' : ''}>
              보이그룹
            </div>
            <div
              className={
                currentGender === 'boy'
                  ? 'mt-1.5 w-4/5 h-0.5 bg-black rounded-full'
                  : 'mt-1.5 w-4/5 h-0.5 none rounded-full'
              }
            />
          </button>
          <button
            onClick={() => {
              handleTypeSelection('girl', 'group')
            }}
            className="flex flex-col items-center font-bold max-w-fit px-1"
          >
            <div className={currentGender !== 'girl' ? 'text-gray-500' : ''}>
              걸그룹
            </div>
            <div
              className={
                currentGender === 'girl'
                  ? 'mt-1.5 w-4/5 h-0.5 bg-black rounded-full'
                  : 'mt-1.5 w-4/5 h-0.5 none rounded-full'
              }
            />
          </button>
          <button
            onClick={() => {
              handleTypeSelection('', 'solo')
            }}
            className="flex flex-col items-center font-bold max-w-fit px-1"
          >
            <div className={artistType !== 'solo' ? 'text-gray-500' : ''}>
              솔로
            </div>
            <div
              className={
                artistType === 'solo'
                  ? 'mt-1.5 w-4/5 h-0.5 bg-black rounded-full'
                  : 'mt-1.5 w-4/5 h-0.5 none rounded-full'
              }
            />
          </button>
        </div>
      )}
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
  )
}
