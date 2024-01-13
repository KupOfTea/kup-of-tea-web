'use client'
import { atom } from 'recoil'

export const modalState = atom({
  key: 'modalState',
  default: {
    activeButtonIdx: -1,
  },
})
