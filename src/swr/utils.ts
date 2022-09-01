import type { QueryKey } from 'react-query'
import { useQueryClient } from 'react-query'
import type { Updater } from 'react-query/types/core/utils'
import type { SetDataOptions } from 'react-query/types/core/types'

export function useQueryKey<T = any>(key: QueryKey) {
  const client = useQueryClient()

  const invalidateData = async () => {
    await client.invalidateQueries(key)
  }

  const setQueryData = (
    updater: Updater<T | undefined, T>,
    options?: SetDataOptions,
  ) => {
    client.setQueryData<T>(key, updater, options)
  }

  return {
    client,
    invalidateData,
    setQueryData,
  }
}
