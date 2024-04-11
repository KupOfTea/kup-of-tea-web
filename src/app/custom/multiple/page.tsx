'use client'

import uuid from 'react-uuid'
import classNames from 'classnames'

import { NINE_ITEMS } from '@/constants/question'
import { USER_LENGTH } from '@/constants/user'

import CustomBackButtonAppBar from '@/components/CustomBackButtonAppBar'
import UserInput from '@/components/UserInput'
import CustomSelectButton from '@/components/CustomSelectButton'
import CustomGenerateButton from '@/components/CustomGenerateButton'

export default function MultiplePage() {
  return (
    <div className="flex flex-col w-full min-h-dvh h-full bg-[#FAFAFA]">
      <CustomBackButtonAppBar title="다인용 취향표" />
      <div className="flex flex-col items-center justify-start w-full px-5 py-4 min-h-screen bg-[#FAFAFA]">
        {Array.from({ length: USER_LENGTH }).map((_, userIndex) => {
          return (
            <div
              className={classNames(
                'flex flex-col w-full border-b border-b-black border-opacity-10 pb-6',
                userIndex === 0 ? '' : 'pt-6',
              )}
              key={`custom-user-form-${userIndex + 1}`}
            >
              <UserInput
                key={`custom-user-input-${userIndex + 1}`}
                index={userIndex}
              />
              <div className="w-full grid grid-cols-5 mt-5 gap-x-1 gap-y-4 justify-items-center">
                {NINE_ITEMS.map((__, itemIndex) => (
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
      <CustomGenerateButton />
    </div>
  )
}
