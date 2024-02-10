'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

import { Team } from '@/types/team'

interface Props {
  team: Team
}

export default function TeamCard({ team }: Props) {
  const router = useRouter()

  const handleClick = (item: Team) => {
    router.push(`/${item.ticker}`)
  }

  return (
    <button
      onClick={() => handleClick(team)}
      className="w-full flex flex-row py-4 px-5 cursor-pointer justify-between text-gray-900 text-base font-bold border-b border-base-200"
    >
      <div className="flex flex-row items-start justify-start space-x-2">
        <Image
          className="object-contain object-center aspect-square w-6 h-6"
          src={`${team.logo}`}
          alt=""
          width={30}
          height={30}
        />
        <div>{team.name}</div>
      </div>
      <div>→</div>
    </button>
  )
}
