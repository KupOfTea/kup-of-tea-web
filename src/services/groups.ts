import { Group, GroupAPISchema } from '@/client/groups'
import useSWR from 'swr'
import { z } from 'zod'

export type GroupsResponse = Group[]

const fetcher = (url: string) =>
  fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/${url}`).then((r) => r.json())

export const useGroups = (gender: string) => {
  const { data, error } = useSWR<GroupsResponse | undefined>(
    `groups/get/${gender}`,
    fetcher,
  )

  // Optionally, validate or transform the data here if needed
  const groups = data ? z.array(GroupAPISchema).safeParse(data) : undefined

  return {
    groups: groups?.success ? (groups.data as Group[]) : [],
    isLoading: !error && !data,
    isError: error,
  }
}

export const useGroup = (ticker: string) => {
  const { data, error } = useSWR(`group/get/${ticker}`, fetcher)

  return {
    group: data,
    isLoading: !error && !data,
    isError: error,
  }
}
