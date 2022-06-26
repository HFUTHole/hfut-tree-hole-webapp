import type { Noop } from 'react-hook-form'
import { useMemo } from 'react'

export function useBeforeMount(cb: Noop) {
  useMemo(cb, [])
}
