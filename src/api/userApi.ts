import { sendGet, sendDelete, sendPut, sendPost } from './axios';

export const getUsers = (params = {}) => sendGet('/admin/users', params);
export const deleteUser = (id: number) => sendDelete(`/admin/users/${id}`, {});
export const updateUser = (id: number, data: any) => sendPut(`/admin/users/${id}`, data);
export const addUser = (data: any) => sendPost('/admin/users', data);
