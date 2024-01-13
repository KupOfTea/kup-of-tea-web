export function generateAnswerKey(
  index: number,
  type: string,
  userId?: string,
): string {
  if (type === 'multiple' && userId) {
    return `multi-${userId}-${index}`
  } else {
    return `${type}-${index}`
  }
}
