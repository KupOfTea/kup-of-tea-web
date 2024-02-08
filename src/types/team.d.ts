interface BaseTeam {
  name: string
  logo: string | null
}

export interface Team extends BaseTeam {
  ticker: string
}

export interface TeamWithId extends Team {
  id: number
}
