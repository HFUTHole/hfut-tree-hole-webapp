declare interface AuthLoginResponseType {
  data: Data;
  msg: string;
  code: number;
}
interface Data {
  token: string;
}