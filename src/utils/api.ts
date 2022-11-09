import { AxiosError } from 'axios';
import { axios } from '../utils/axios';
import { InputSignIn, InputSignUp, InputUpdate } from './types';

export const SignIn = async (input: InputSignIn) => {
  try {
    const res = await axios.post('/auth/signin', input);
    const result = await res.data;
    return result;
  } catch (err) {
    const error = err as AxiosError;
    throw error.response?.data;
  }
};

export const SignUp = async (input: InputSignUp) => {
  try {
    const res = await axios.post('/auth/signup', input);
    const result = await res.data;
    return result;
  } catch (err) {
    const error = err as AxiosError;
    throw error.response?.data;
  }
};

export const GetUsers = async () => {
  try {
    const res = await axios.get('/auth');
    const result = await res.data;
    return result;
  } catch (err) {
    const error = err as AxiosError;
    throw error.response?.data;
  }
};

export const GetUsersId = async (id: string) => {
  try {
    const res = await axios.get(`/auth/${id}`);
    const result = await res.data;
    return result;
  } catch (err) {
    const error = err as AxiosError;
    throw error.response?.data;
  }
};

export const UpdateUserId = async (input: InputUpdate) => {
  try {
    const res = await axios.put(`/auth/${input.id}`, input);
    const result = await res.data;
    return result;
  } catch (err) {
    const error = err as AxiosError;
    throw error.response?.data;
  }
};

export const DeleteUserId = async (id: string) => {
  try {
    const res = await axios.delete(`/user/${id}`);
    const result = res.data;
    return result;
  } catch (err) {
    const error = err as AxiosError;
    throw error.response?.data;
  }
};

export const GetSession = async () => {
  const res = await axios.get('/auth/token');
  const result = await res.data;
  return result;
};
