declare interface TreeholeDetailResponseType {
  data: Data;
  msg: string;
  code: number;
}
interface Data {
  data: Datum2[];
}
interface Datum2 {
  id: number;
  content: string;
  stars: number;
  starUserIds: any[];
  imgs: any[];
  comments: Comments;
  createTime: string;
  user: User;
}
interface Comments {
  data: Datum[];
  length: number;
}
interface Datum {
  _id: string;
  content: string;
  createTime: string;
  user: User;
}
interface User {
  username: string;
}