declare interface ITreeHoleListData {
  id: number
  content: string
  stars: number
  starUserIds: number[]
  imgs: any[]
  comments: Comments
  createTime: string
}

interface Comments {
  data: ICommentsItem[]
  length: number
}

declare interface ICommentsItem {
  _id: string
  content: string
  createTime: string
  user: User
  isOwner: boolean
}

interface User {
  username: string
}
