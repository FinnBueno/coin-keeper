export function typedObjectKeys<T extends object>(object: T) {
  return Object.keys(object) as (keyof typeof object)[];
}
