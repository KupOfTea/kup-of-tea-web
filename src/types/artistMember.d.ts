interface BaseArtistMember {
  id: number | null | undefined
  name: string | null | undefined
  profileImage: string | null | undefined
}

export interface ArtistMember extends BaseArtistMember {}
