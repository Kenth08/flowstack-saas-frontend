// Tiny className joiner — filters out falsy values.
// Keeps component markup readable without pulling in a dependency.
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
