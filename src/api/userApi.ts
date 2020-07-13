import { sendGet } from "./axios";

export const getUsers = (params = {}) => sendGet("/admin/users", params);
