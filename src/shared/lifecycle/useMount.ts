import type { Noop } from 'react-hook-form'
import { useEffect } from 'react'

export function useMount(cb: Noop) {
  useEffect(cb, [])
}
