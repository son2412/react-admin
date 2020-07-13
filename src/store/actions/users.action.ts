import { IUser } from "../models/user.interface";
import { createAction } from 'redux-actions';
import Users from '../types/users';

export const ADD_ADMIN: string = "ADD_ADMIN";

export function addAdmin(user: IUser): IAddAdminActionType {
    return { type: ADD_ADMIN, user: user };
}

export const loadUsers = createAction(Users.LOAD_USERS);
export const loadUsersSuccess = createAction(Users.LOAD_USERS_SUCCESS);
export const loadUsersFail = createAction(Users.LOAD_USERS_FAIL);


interface IAddAdminActionType { type: string, user: IUser };
