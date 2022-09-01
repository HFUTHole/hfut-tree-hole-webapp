export declare interface ITreeholeDetailData {
  id: number
  content: string
  stars: number
  imgs: string[]
  comments: Comment[]
  createTime: string
  user: User2
  comments_length: number
  isStar: boolean
  isOwner: boolean
}

interface Comment {
  _id: string
  content: string
  createTime: string
  user: User
  isOwner: boolean
}

interface User {
  username: string
}

interface User2 {
  username: string
  roles: string[]
}
