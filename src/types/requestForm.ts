interface RequestMemberForm {
  name: string
  image: string
}

export interface RequestTeamForm {
  name: string
  ticker: string
  logo: any
  type: string
  gender: string
  members: RequestMemberForm[]
}
