export interface ITreeHoleListData {
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

export interface ICommentsItem {
  _id: string
  content: string
  createTime: string
  user: User
}

interface User {
  username: string
}
