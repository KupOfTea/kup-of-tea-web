export const getImageUrl = (url: string) => {
  return `${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${url}?`
}
