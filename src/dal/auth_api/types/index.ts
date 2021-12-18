export type AuthMeType = {
  id: number;
  email: string;
  login: string;
};
export type LoginRequestType = {
  email: string;
  password: string;
  rememberMe: boolean;
  captcha?: string;
};
