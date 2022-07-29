export interface ITreeholeDetailData {
  desc: string
  id: string
  createTime: string
  commentsNum: number
  stars: number
  comments: Comment[]
  imgs: any[]
}

export interface Comment {
  avatar: string
  isHost: boolean
  content: string
  createTime: string
  username: string
}
