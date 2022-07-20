import { AxiosError } from "axios";

export type LoginForm = {
  email: string;
  password: string;
}

export interface UserAuth {
  token: string;
  token_expires: string;
  user: {
    _id: string;
    name: string;
    lastname: string;
    email: string;
    is_admin: boolean;
    created_at: string;
    updated_at: string
  }
}

export interface User {
  _id: string;
  name: string;
  lastname: string;
  email: string;
  is_admin: boolean;
  created_at: string;
  updated_at: string
}

export interface AxiosUserAuth {
  data: UserAuth
}

export interface AxiosUser {
  data: User
}

export interface AxiosCatch {
  response: {
    data: any
  }
}
