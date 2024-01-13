import client from './base'

const fetchTeam = async (ticker: string) => {
  const { data, error } = await client
    .from('teams')
    .select('id')
    .eq('ticker', ticker)
    .single()

  if (error) {
    return null
  }

  const { id } = data

  return id
}
