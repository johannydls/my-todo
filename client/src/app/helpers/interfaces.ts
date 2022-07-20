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

export interface Task {
  _id: string;
  title: string;
  description: string;
  categories: string[];
  created_at: string;
  updated_at: string;
  is_archived: string;
  status: string;
  owner: any;
}
export interface AxiosTasksPaginate {
  data: {
    limit: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    hasMore: boolean;
    docs: Task[];
    totalDocs: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
  }
}
