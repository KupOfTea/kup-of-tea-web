import { z } from 'zod'

export const GroupAPISchema = z.object({
  name: z.string(),
  logo: z.string(),
  ticker: z.string().nullish(),
})

export type Group = z.infer<typeof GroupAPISchema>

export async function getGroup(ticker: string) {
  const fetched = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/group/get/${ticker}`,
  ).then((r) => r.json())

  return GroupAPISchema.parse(fetched)
}

export async function getGroups(type: string, gender: string) {
  const fetched = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/groups/get/${type}/${gender}`,
  ).then((r) => r.json())

  const groups = fetched
    ? z.array(GroupAPISchema).safeParse(fetched)
    : undefined

  return groups?.success ? (groups?.data as Group[]) : []
}
