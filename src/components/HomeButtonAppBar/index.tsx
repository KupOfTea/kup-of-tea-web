'use client'
import { useRouter } from 'next/navigation'

export default function HomeButtonAppBar() {
  const router = useRouter()

  return (
    <div className="flex flex-row justify-between items-center mb-10 w-full bg-white border-b-[1.2px] border-base-300 h-12 px-4">
      <button
        onClick={() => router.push(`/`)}
        className="text-xl text-secondaryForeground font-medium"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="w-5 h-5"
        >
          <path
            fillRule="evenodd"
            d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  )
}
