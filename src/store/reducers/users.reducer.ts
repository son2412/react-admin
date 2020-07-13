import { IUserState } from '../models/root.interface';
import { handleActions } from 'redux-actions';
import Users from '../types/users';

const initialState: IUserState = {
  items: [],
  loading: false,
  totalRow: 0
};

const actions = {
  [Users.LOAD_USERS]: (state: any) => ({
    ...state,
    loading: true
  }),
  [Users.LOAD_USERS_SUCCESS]: (state: any, action: any) => ({
    ...state,
    items: action.payload.items,
    totalRow: action.payload.totalRow,
    loading: false
  }),
  [Users.LOAD_USERS_FAIL]: (state: any) => ({
    ...state,
    items: [],
    loading: false
  })
};

export default handleActions(actions, initialState);
