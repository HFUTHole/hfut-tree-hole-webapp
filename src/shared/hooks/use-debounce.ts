import type { Noop } from 'react-hook-form'

export function useDebounce<T extends (...args: any[]) => any>(
  fn: T,
  ms: number,
  deps = [],
  before?: Noop,
) {
  const callback = useRef<T>(fn)
  const timer = useRef<ReturnType<typeof setTimeout>>()

  useEffect(() => {
    callback.current = fn
  }, [fn])

  const clear = useCallback(() => {
    timer.current && clearTimeout(timer.current)
  }, [])

  return useCallback(() => {
    timer.current && clearTimeout(timer.current)

    before && before()

    timer.current = setTimeout(() => {
      callback.current()
    }, ms)

    return clear
  }, deps)
}
