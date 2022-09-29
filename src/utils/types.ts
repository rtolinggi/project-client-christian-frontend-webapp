export type User = {
  CreatedAt: string;
  DeletedAt: string;
  UpdatedAt: string;
  ID: number;
  kata_sandi: string;
  nama_pengguna: string;
  refresh_token:string;
  role: string;
}

export type InputSignIn = {
  nama_pengguna: string;
  kata_sandi: string;
}

export type ErrorResponse = {
    status: number,
    data: {
    success:boolean;
    message: string;
  }
}