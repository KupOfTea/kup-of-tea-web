import useSWR from 'swr'
import { z } from 'zod'
import { mapKeys, camel } from 'radash'

export const MemberAPISchema = z
  .record(z.string())
  .transform((x) => mapKeys(x, camel))
  .pipe(
    z.object({
      name: z.string(),
      profileImage: z.string(),
    }),
  )

export type Member = z.infer<typeof MemberAPISchema>

export type MembersResponse = Member[]

const fetcher = (url: string) =>
  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`).then((r) => r.json())

export const useMembers = (ticker: string) => {
  const { data, error } = useSWR<MembersResponse | undefined>(
    `members/get/${ticker}`,
    fetcher,
  )

  // Optionally, validate or transform the data here if needed
  const members = data ? z.array(MemberAPISchema).safeParse(data) : undefined

  return {
    members: members?.success ? (members.data as Member[]) : [],
    isLoading: !error && !data,
    isError: error,
  }
}
