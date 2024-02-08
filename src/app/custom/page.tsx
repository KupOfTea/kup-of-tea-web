'use client'

import classNames from 'classnames'

import CustomSelectionNavigationButton from '@/components/CustomSelectionNavigationButton'
import HomeButtonAppBar from '@/components/HomeButtonAppBar'

export default function CustomLandingPage() {
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
          <div>여러 팀 선택</div>
          <div>취향표</div>
        </div>
        <div>한 팀의 멤버 말고 여러 팀 멤버를 볼 수 있어요</div>
        <div className="object-cover w-[50%] aspect-square mb-10" />
        <div className="mb-10 flex flex-col w-full space-y-5 items-center justify-center">
          <CustomSelectionNavigationButton
            path="single"
            title="1인용 취향표"
            border
          />
          <CustomSelectionNavigationButton
            path="multiple"
            title="6인용 취향표"
            border={false}
          />
        </div>
      </div>
    </div>
  )
}
