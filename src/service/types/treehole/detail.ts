import type { ITreeHoleListData } from '@/service/types/treehole/list'

export interface ITreeholeDetailData extends ITreeHoleListData {
  comments: ITreeholeDetailDataComment[]
}

export interface ITreeholeDetailDataComment extends ITreeholeDetailDataReply {
  reply: ITreeholeDetailDataReply[]
}

export interface ITreeholeDetailDataReply {
  avatar: string
  isHost: boolean
  content: string
  createTime: string
  username: string
}
