export interface Avatar {
  public_id: string;
  url: string;
}

export interface User {
  _id: string;
  name: string;
  email: string;
  avatar: Avatar;
  role: string;
  createdAt: string;
}

export interface LoginRes {
  success: boolean;
  token: string;
  user: User;
}

export interface LoginReq {
  email: string;
  password: string;
}
