// Where's Python when you need it?
export function sorted(values) {
  values.sort()
  return values
}

export function set(values) {
  return Array.from(new Set(values))
}
