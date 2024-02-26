import { z } from 'zod'

import { Member, MemberAPISchema } from '@/services/members'

export async function getMembers(ticker: string) {
  const fetched = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/members/get/${ticker}`,
  ).then((r) => r.json())

  const members = fetched
    ? z.array(MemberAPISchema).safeParse(fetched)
    : undefined

  return members?.success ? (members?.data as Member[]) : []
}
