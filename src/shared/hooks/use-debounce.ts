import { useDebounceFn } from 'ahooks'
import type { Noop } from 'react-hook-form'

export function useDebounce<T extends Noop>(fn: T, ms: number) {
  const { run } = useDebounceFn(fn, { wait: ms })

  return run
}
