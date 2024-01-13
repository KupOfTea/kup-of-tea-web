import { usePathname } from 'next/navigation'

export function generateAnswerKey(index: number, userId?: string): string {
  const type = usePathname().split('/')[2]

  if (type === 'multiple' && userId) {
    return `multi-${userId}-${index}`
  } else {
    return `${type}-${index}`
  }
}
