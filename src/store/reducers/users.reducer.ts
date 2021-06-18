import { IActionBase, IUserState } from '../models/root.interface';
import Users from '../types/users';

const initialState: IUserState = {
  items: [],
  loading: false,
  totalRow: 0
};

function userReducer(state: IUserState = initialState, action: IActionBase): IUserState {
  switch (action.type) {
    case Users.LOAD_USERS:
      return {
        loading: true,
        items: state.items,
        totalRow: 0
      };
    case Users.LOAD_USERS_SUCCESS:
      return {
        loading: false,
        items: [...state.items, ...action.payload.items],
        totalRow: action.payload.totalRow
      };
    case Users.LOAD_USERS_FAIL:
      return {
        loading: false,
        items: [],
        totalRow: 0
      };
    default:
      return state;
  }
}

export default userReducer;
