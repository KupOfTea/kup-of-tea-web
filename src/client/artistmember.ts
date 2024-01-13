import client from './base'

const fetchTeam = async (ticker: string) => {
  const { data, error } = await client
    .from('teams')
    .select('id')
    .eq('ticker', ticker)
    .single()

  if (error) {
    throw error
  }

  const { id } = data

  return id
}

export const fetchArtistMembers = async (ticker: string) => {
  const teamId = fetchTeam(ticker)

  return await client.from('artist_members').select('*').eq('team_id', teamId)
}
