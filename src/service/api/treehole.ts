import { request } from '@/service'
import { TreeholeList } from '@/__mock__/treehole'

export interface TTreeHoleMode {
  modes: Record<'value' | 'cn', string>[]
}

export function getTreeholeModesRequest() {
  return request<TTreeHoleMode>({
    url: '/treehole/modes',
  })
}

export function getTreeholeListRequest(mode: string) {
  return Promise.resolve(TreeholeList)
}
