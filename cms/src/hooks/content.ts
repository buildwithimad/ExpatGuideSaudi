const collectText = (value: unknown): string => {
  if (value == null) {
    return ''
  }

  if (typeof value === 'string') {
    return value
  }

  if (Array.isArray(value)) {
    return value
      .map(collectText)
      .filter(Boolean)
      .join(' ')
  }

  if (typeof value === 'object') {
    const record = value as Record<string, unknown>

    return [
      collectText(record.text),
      collectText(record.children),
      collectText(record.root),
    ]
      .filter(Boolean)
      .join(' ')
  }

  return ''
}

export const calculateReadingTime = (
  content: unknown,
  wordsPerMinute = 225,
): number => {
  const text = collectText(content)

  const wordCount = text
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .length

  const readingTime = Math.max(
    1,
    Math.ceil(wordCount / wordsPerMinute),
  )

 

  return readingTime
}