'use client'

import { useParams, usePathname, useRouter } from 'next/navigation'

export default function GenerateButton() {
  const router = useRouter()
  const { ticker } = useParams()
  const type = usePathname().split('/')[2]

  return (
    <button
      onClick={() => {
        router.push(`/${ticker}/${type}/download`)
      }}
      className="fixed left-0 right-0 mx-auto w-[85%] px-4 py-[16px] bg-gray-900 text-white font-bold text-center text-[13px] bottom-[35px] rounded-[28px]"
      style={{ maxWidth: '30rem' }}
    >
      만들기
    </button>
  )
}
