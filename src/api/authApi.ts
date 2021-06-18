import { sendPost } from './axios';

export const login = (data: DLogIn) => sendPost('auth/login', data);

interface DLogIn {
  email: string;
  password: string;
}
