'use client'

import uuid from 'react-uuid'
import Image from 'next/image'
import { useQuery } from '@supabase-cache-helpers/postgrest-swr'
import { useRouter } from 'next/navigation'

import client from '@/client/base'
import { Team } from '@/types/team'

interface Props {
  isOpen: boolean
  close: () => void
}

export default function NavigationModal({ isOpen, close }: Props) {
  const router = useRouter()
  const { data } = useQuery(client.from('teams').select('name, ticker, logo'), {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  })

  const teams: Team[] = data || []

  const handleClick = (team: Team) => {
    router.push(`/${team.ticker}`)
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
              <div className="flex flex-col space-y-3 mt-2 text-start sm:ml-4 sm:text-left">
                <div className="flex flex-col items-center mx-3 text-base-800 px-3 py-1.5 rounded-2xl text-sm font-bold">
                  <span>안녕하세요!</span>
                  <span>취향표를 만들고 싶은 팀을 선택해 주세요.</span>
                  <span className="mt-2 text-[10px] text-base-500">
                    혹시 없다면... 구글폼에 추가 제안 해 주세요!
                  </span>
                  <a
                    className="font-extrabold text-[10px] text-sky-500"
                    href="https://forms.gle/xkrDGoCzuMKsBa6d6"
                  >
                    폼 작성하러 가기
                  </a>
                </div>
                <div className="grid grid-cols-3">
                  {teams.map((team, idx) => {
                    return (
                      <button
                        key={uuid()}
                        onClick={() => handleClick(team)}
                        className="flex flex-col items-center p-4 space-y-2 cursor-pointer justify-center"
                      >
                        <Image
                          className="object-contain object-center aspect-square mb-1 w-1/3"
                          src={`${team.logo}`}
                          alt=""
                          width={1000}
                          height={1000}
                        />
                        <p className="text-gray-900 text-[8px] font-semibold">{`${team.name}`}</p>
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
