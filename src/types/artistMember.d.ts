interface BaseArtistMember {
  id: number
  name: string | null
  profileImage: string | null
}

export interface ArtistMember extends BaseArtistMember {}
