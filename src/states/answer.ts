'use client'

import { atom, atomFamily, selector } from 'recoil'

import { QUESTION_LENGTH } from '@/constants/question'
import { USER_LENGTH } from '@/constants/user'
import { Answer } from '@/types/answer'

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

const generateSingleIds = () => {
  const ids = []

  for (let i = 0; i < 9; i++) {
    ids.push(`single-${i}`)
  }

  return ids
}

export const answerIdsState = atom<string[]>({
  key: 'answerIdsState',
  default: generateIds(),
})

export const answerSingleIdsState = atom<string[]>({
  key: 'answerSingleIdsState',
  default: generateSingleIds(),
})

export const allAnswersSelector = selector<Answer[]>({
  key: 'allAnswersSelector',
  get: ({ get }) => {
    const ids = get(answerIdsState)
    return ids.map((id) => get(answerState(id)))
  },
})

export const allSingleAnswersSelector = selector<Answer[]>({
  key: 'allSingleAnswersSelector',
  get: ({ get }) => {
    const ids = get(answerSingleIdsState)
    return ids.map((id) => get(answerState(id)))
  },
})
