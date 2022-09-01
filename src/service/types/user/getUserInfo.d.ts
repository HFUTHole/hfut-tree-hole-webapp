declare interface IGetUserInfoData {
  user: User
  holesPostNum: number
  stars: number
}

interface User {
  studentId: number
  username: string
  password: string
  holeIds: any[]
  roles: string[]
}
