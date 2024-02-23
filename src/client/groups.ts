import { z } from 'zod'

import { fetchAPI } from '@/services/base'

export const GroupAPISchema = z.object({
  name: z.string(),
  logo: z.string(),
  ticker: z.string().nullish(),
})

export type Group = z.infer<typeof GroupAPISchema>

export async function getGroup(ticker: string) {
  const fetched = await fetchAPI.get(`group/get/${ticker}`).json()
  return GroupAPISchema.parse(fetched)
}