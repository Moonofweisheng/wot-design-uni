export function useReplacePlaceholders() {
  const replacePlaceholders = (template: string, values: any[]): string => {
    return template.replace(/{(\d+)}/g, (_, index) => values[index] ?? '')
  }

  return {
    replacePlaceholders
  }
}
