import { request } from '@/service'

export interface TTreeHoleMode {
  modes: Record<'value' | 'cn', string>[]
}

export function getTreeholeModesRequest() {
  return request<TTreeHoleMode>({
    url: '/treehole/modes',
  })
}
