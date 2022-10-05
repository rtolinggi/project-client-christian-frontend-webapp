import { ReactNode } from "react";

export type User = {
  CreatedAt: string;
  DeletedAt: string;
  UpdatedAt: string;
  ID: number;
  kata_sandi: string;
  nama_pengguna: string;
  refresh_token: string;
  role: string;
};

export type ErrorMutation = {
  code: number;
  data: null;
  errors: {};
  status: string;
};

export type InputSignIn = {
  nama_pengguna: string;
  kata_sandi: string;
};

export type InputSignUp = {
  nama_pengguna: string;
  kata_sandi: string;
  role: string;
};

export type ErrorResponse = {
  status: number;
  data: {
    success: boolean;
    message: string;
  };
};

export type DataUsers = {
  ID: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  DeletedAt: Date;
  nama_pengguna: string;
  kata_sandi: string;
  refresh_token: string;
  role: string;
};
