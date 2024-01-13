'use client'
import { QUESTION_LENGTH } from '@/constants/question'
import { USER_LENGTH } from '@/constants/user'
import { Answer } from '@/types/answer'
import { atom, atomFamily, selector } from 'recoil'

export const answerState = atomFamily<Answer, string>({
  key: 'answerState',
  default: (id) => {
    return {
      id,
      artistMember: null,
    }
  },
})

const generateIds = () => {
  const ids = []

  for (let i = 0; i < USER_LENGTH; i++) {
    for (let j = 0; j < QUESTION_LENGTH; j++) {
      ids.push(`multi-u${i}-${j}`)
    }
  }

  return ids
}

export const answerIdsState = atom<string[]>({
  key: 'answerIdsState',
  default: generateIds(),
})

export const allAnswersSelector = selector<Answer[]>({
  key: 'allAnswersSelector',
  get: ({ get }) => {
    const ids = get(answerIdsState)
    return ids.map((id) => get(answerState(id)))
  },
})
