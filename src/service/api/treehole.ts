import { request } from '@/service'
import type { ITreeHoleListData } from '@/service/types/treehole/list'
import type { ITreeholeDetailData } from '@/service/types/treehole/detail'

export interface TTreeHoleMode {
  modes: Record<'value' | 'cn', string>[]
}

export function getTreeholeModesRequest() {
  return request<TTreeHoleMode>({
    url: '/treehole/modes',
  })
}

export function getTreeholeListRequest(mode: string) {
  return request<ITreeHoleListData[]>({
    url: '/treehole/list',
    params: {
      mode,
    },
  })
}

export function getTreeholeDetailRequest(id: number) {
  return request<ITreeholeDetailData>({
    url: '/treehole/detail',
    params: {
      id,
    },
  })
}
