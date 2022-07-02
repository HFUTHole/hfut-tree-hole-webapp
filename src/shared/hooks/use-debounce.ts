export function useDebounce<T extends (...args: any[]) => any>(
  fn: T,
  ms: number,
  deps = [],
  immediate = false,
) {
  const callback = useRef<T>(fn)
  const timer = useRef<ReturnType<typeof setTimeout>>()
  const isFirstTrigger = useRef(true)

  useEffect(() => {
    callback.current = fn
  }, [fn])

  const clear = useCallback(() => {
    timer.current && clearTimeout(timer.current)
  }, [])

  return useCallback((...args: any[]) => {
    timer.current && clearTimeout(timer.current)

    if (isFirstTrigger.current && immediate) {
      callback.current(args)
    } else {
      timer.current = setTimeout(() => {
        callback.current(args)
      }, ms)
    }

    return clear
  }, deps)
}
