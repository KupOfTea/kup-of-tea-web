function toCamelCase(str: string): string {
  return str.replace(/([-_]\w)/g, (match) => {
    return match[1].toUpperCase()
  })
}

export function convertObjectKeysToCamelCase<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map((v) => convertObjectKeysToCamelCase(v)) as unknown as T
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((result: any, key) => {
      const camelKey = toCamelCase(key)
      result[camelKey] = convertObjectKeysToCamelCase((obj as any)[key])
      return result
    }, {}) as T
  }
  return obj
}
