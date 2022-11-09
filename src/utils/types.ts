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
  email: string;
  passwordHash: string;
};

export type InputSignUp = {
  email: string;
  passwordHash: string;
  role: string;
};

export type InputUpdate = {
  id?: string;
  role: string;
  isActive: boolean;
};

export type ErrorResponse = {
  status: number;
  data: {
    success: boolean;
    message: string;
  };
};

export type DataUsers = {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  isVerified: boolean;
  passwordHash: string;
  refresh_token: string;
  role: string;
};
