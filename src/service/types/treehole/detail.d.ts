declare interface ITreeholeDetailData {
  id: number
  content: string
  stars: number
  imgs: string[]
  comments: ICommentsItem[]
  createTime: string
  user: User2
  comments_length: number
  isStar: boolean
  isOwner: boolean
}

