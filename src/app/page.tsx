'use client'

import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  return (
    <div className="flex flex-col items-center justify-center w-full px-5 py-10 min-h-screen bg-white">
      <div className="flex flex-col items-center space-y-1.5">
        <div className="font-semibold text-2xl text-base-600">
          <span>My </span>
          <span className="text-rose-500 text-4xl font-extrabold">K</span>
          <span>up Of Tea</span>
        </div>
        <span className="text-base-400 text-xs font-bold">
          K-POP 아이돌 취향표 생성기
        </span>
        <a
          href="https://twitter.com/DevvTyga"
          className="py-3 text-sky-300 text-[10px] font-semibold"
        >
          @DevvTyga
        </a>
      </div>
      <div className="flex flex-col w-full">
        <button
          onClick={() => router.push('/select')}
          className="mt-40 mx-2 text-center text-lg font-extrabold py-3 w-full bg-black text-white shadow-sm rounded-full"
        >
          팀 선택하기
        </button>
        <button
          onClick={() => router.push('/custom')}
          className="mt-2 mx-2 text-center text-lg font-extrabold py-3 w-full bg-white text-black border-2 border-black shadow-sm rounded-full"
        >
          팀 제한 X 취향표
        </button>
      </div>
      <div className="space-y-3 flex flex-col mt-10 font-medium text-white text-xs">
        <div className="bg-sky-600 px-3 py-2 rounded-md text-center">
          이 사이트를 만든 개발자가 구직 중입니다...
          <br />
          개발자 구하시는 회사가 있다면 연락 주세요... ㅠㅠ
        </div>
        {/* <div className="bg-sky-500 px-3 py-2 rounded-md text-center">
          이 사이트를 사이드 프로젝트로 같이 진행하실
          <br />
          디자이너님도 구합니다... 연락 주세요...!!!!
        </div> */}
      </div>
    </div>
  )
}
