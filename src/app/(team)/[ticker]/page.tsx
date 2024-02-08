'use client'

import { useQuery } from '@supabase-cache-helpers/postgrest-swr'
import classNames from 'classnames'
import Image from 'next/image'

import client from '@/client/base'
import { Team } from '@/types/team'
import { convertObjectKeysToCamelCase } from '@/utils/camelCase'

import NavigationButton from '@/components/NavigationButton'
import HomeButtonAppBar from '@/components/HomeButtonAppBar'

interface Props {
  params: {
    ticker: string
  }
}

export default function TeamLandingPage({ params: { ticker } }: Props) {
  const { data } = useQuery(
    client.from('teams').select(`name, logo`).eq('ticker', ticker).single(),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    },
  )

  const team: Team = convertObjectKeysToCamelCase(data) as Team

  return (
    <div className="flex min-h-screen flex-col items-center bg-white">
      <HomeButtonAppBar />
      <div className="flex flex-col items-center justify-start w-full px-5 py-10 min-h-screen bg-white">
        <div
          className={classNames(
            'mb-20 text-3xl font-black text-black flex flex-col text-center',
            '.service-title',
          )}
        >
          <div>{team?.name || ''}</div>
          <div>취향표</div>
        </div>
        {team?.logo ? (
          <Image
            className="object-contain w-[50%] aspect-square mb-10"
            src={team.logo}
            alt=""
            width={1000}
            height={1000}
            unoptimized
          />
        ) : (
          <div className="object-cover w-[50%] aspect-square mb-10" />
        )}
        <div className="mb-10 flex flex-col w-full space-y-5 items-center justify-center">
          <NavigationButton path="single" title="1인용 취향표" border />
          <NavigationButton
            path="multiple"
            title="6인용 취향표"
            border={false}
          />
        </div>
      </div>
    </div>
  )
}
