'use client'

import uuid from 'react-uuid'

import { NINE_ITEMS } from '@/constants/question'
import { USER_LENGTH } from '@/constants/user'

import CustomBackButtonAppBar from '@/components/CustomBackButtonAppBar'
import CustomGenerateButton from '@/components/CustomGenerateButton'
import CustomSelectButton from '@/components/CustomSelectButton'
import CustomUserInput from '@/components/CustomUserInput'

export default function MultiplePage() {
  return (
    <div className="flex min-h-screen flex-col items-center bg-white pb-[200px]">
      <CustomBackButtonAppBar title="다인용 취향표" />
      <div className="flex flex-col items-center space-y-10 justify-start w-full px-5 py-10 min-h-screen bg-white">
        <div className="flex flex-col items-center">
          <div className="font-bold text-[14px] mb-[10px] text-grey-900 text-center">
            친구들과 함께 취향표를 만들어 보세요.
          </div>
          <div className="font-semibold text-[#A6A6A6] text-[10px] mb-[24px]">
            빠진 문항이 없도록 잘 입력해 주세요.
          </div>
        </div>
        <div className="flex flex-col items-center w-full space-y-10">
          {Array.from({ length: USER_LENGTH }).map((_, userIndex) => {
            return (
              <div
                className="flex flex-col space-y-5"
                key={`custom-user-form-${userIndex + 1}`}
              >
                <CustomUserInput
                  key={`custom-user-input-${userIndex + 1}`}
                  index={userIndex}
                />
                <div className="flex flex-row space-x-2">
                  {NINE_ITEMS.map((item, itemIndex) => (
                    <CustomSelectButton
                      index={itemIndex}
                      userId={`u${userIndex}`}
                      key={uuid()}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <CustomGenerateButton />
    </div>
  )
}
