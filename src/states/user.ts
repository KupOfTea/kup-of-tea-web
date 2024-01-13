'use client'
import { USER_LENGTH } from '@/constants/user'
import { User } from '@/types/user'
import { atom, atomFamily, selector } from 'recoil'

export const userState = atomFamily<User, string>({
  key: 'userState',
  default: (id) => {
    return {
      id,
      image: null,
      username: null,
    }
  },
})

const generateIds = () => {
  const ids = []
  for (let i = 0; i < USER_LENGTH; i++) {
    ids.push(`u${i}`)
  }

  return ids
}

export const userIdsState = atom<string[]>({
  key: 'userIdsState',
  default: generateIds(),
})

export const allUsersSelector = selector<User[]>({
  key: 'allUsersSelector',
  get: ({ get }) => {
    const ids = get(userIdsState)
    return ids.map((id) => get(userState(id)))
  },
})
