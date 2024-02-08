'use client'

import uuid from 'react-uuid'
import Image from 'next/image'
import { useQuery } from '@supabase-cache-helpers/postgrest-swr'
import { useRouter } from 'next/navigation'

import client from '@/client/base'
import { Team } from '@/types/team'

interface GridProps {
  gender: string
  close: () => void
}

export default function NavigationGrid({ gender, close }: GridProps) {
  const router = useRouter()
  const { data } = useQuery(
    client
      .from('teams')
      .select('name, ticker, logo')
      .eq('gender', gender)
      .order('id', { ascending: true }),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  const teams: Team[] = data || []

  const handleClick = (team: Team) => {
    router.push(`/${team.ticker}`)
    close()
  }

  return (
    <div className="grid grid-cols-4">
      {teams.map((team, idx) => {
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
  )
}
