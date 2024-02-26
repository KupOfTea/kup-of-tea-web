import { z } from 'zod'

import { fetchAPI } from '@/services/base'
import { Member, MemberAPISchema } from '@/services/members'

export async function getMembers(ticker: string) {
  const fetched = await fetchAPI.get(`members/get/${ticker}`).json()

  const members = fetched
    ? z.array(MemberAPISchema).safeParse(fetched)
    : undefined

  return members?.success ? (members?.data as Member[]) : []
}
