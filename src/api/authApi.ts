import { sendPost } from './axios';

export const login = (data: DLogIn) => sendPost('auth/login', data);
export const loginFB = (data: DLogInFB) => sendPost('auth/signin-facebook', data);
export const loginGoogle = (data: DLogInGoogle) => sendPost('auth/signin-google', data);

interface DLogIn {
  email: string;
  password: string;
}

interface DLogInFB {
  id: string;
  token: string;
}

interface DLogInGoogle {
  token: string;
}
