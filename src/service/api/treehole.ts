import { request } from '@/service'
import type { ITreeHoleListData } from '@/service/types/treehole/list'
import type { ITreeholeDetailData } from '@/service/types/treehole/detail'
import type { Method } from 'axios'

export interface TTreeHoleMode {
  modes: Record<'value' | 'cn', string>[]
}

export function getTreeholeModesRequest() {
  return request<TTreeHoleMode>({
    url: '/treehole/modes',
  })
}

export function getTreeholeListRequest(mode: string, skip: number, limit: number) {
  return request<ITreeHoleListData[]>({
    url: '/treehole/list',
    params: {
      mode,
      skip,
      limit,
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

export function holeCommentMutation(data: { content: string; id: number }) {
  return request<{ commentId: string }>({
    url: '/treehole/comment',
    method: 'POST',
    data,
  })
}

export function removeHoleCommentMutation(data: { id: number; commentId: string }) {
  return request({
    url: '/treehole/comment',
    method: 'DELETE',
    data,
  })
}

export function holeStarMutation(id: number, method: Method) {
  return request({
    url: '/treehole/star',
    method,
    data: {
      id,
    },
  })
}
