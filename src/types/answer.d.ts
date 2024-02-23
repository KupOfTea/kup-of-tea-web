import { Member } from '@/services/members'

export interface Answer {
  id: string
  artistMember: ArtistMember | null | Member
}
