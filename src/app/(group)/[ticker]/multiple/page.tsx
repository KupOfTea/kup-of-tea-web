'use client'

import uuid from 'react-uuid'
import classNames from 'classnames'

import { NINE_ITEMS } from '@/constants/question'
import { USER_LENGTH } from '@/constants/user'

import BackButtonAppBar from '@/components/BackButtonAppBar'
import GenerateButton from '@/components/GenerateButton'
import SelectButton from '@/components/SelectButton'
import UserInput from '@/components/UserInput'

export default function MultiplePage() {
  return (
    <div className="flex flex-col w-full min-h-dvh h-full bg-[#FAFAFA]">
      <BackButtonAppBar title="다인용 취향표" />
      <div className="flex flex-col items-center justify-start w-full px-5 py-4 min-h-screen bg-[#FAFAFA]">
        {Array.from({ length: USER_LENGTH }).map((_, userIndex) => {
          return (
            <div
              className={classNames(
                'flex flex-col w-full border-b border-b-black border-opacity-10 pb-6',
                userIndex === 0 ? '' : 'pt-6',
              )}
              key={`user-form-${userIndex + 1}`}
            >
              <UserInput
                key={`user-input-${userIndex + 1}`}
                index={userIndex}
              />
              <div className="w-full grid grid-cols-5 mt-5 gap-x-1 gap-y-4 justify-items-center">
                {NINE_ITEMS.map((item, itemIndex) => (
                  <SelectButton
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
      <GenerateButton />
    </div>
  )
}
