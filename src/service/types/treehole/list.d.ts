declare type ITreeHoleListData = {
  data: ITreeHoleListDataItem[]
  pageSize: number
  nextPage: number
  hasNextPage: boolean
}

declare interface ITreeHoleListDataItem {
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
