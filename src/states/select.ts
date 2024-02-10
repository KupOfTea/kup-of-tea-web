'use client'

import { atom } from 'recoil'

export const selectState = atom({
  key: 'selectState',
  default: {
    gender: 'boy',
    type: 'group',
    title: '보이그룹',
  },
})
