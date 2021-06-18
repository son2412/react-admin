import { takeLatest, put, call } from 'redux-saga/effects';
import Users from '../types/users';
import { getUsers } from '../../api/userApi';
import { loadUsersSuccess, loadUsersFail } from '../actions/users.action';

function * handleLoadUsers(action: any) {
  try {
    const response = yield call(getUsers, action.payload);
    const { data } = response;
    if (data.success) {
      const items = data.data;
      const totalRow = data.totalRow;
      yield put(loadUsersSuccess({ items, totalRow }));
    }
  } catch (error) {
    yield put(loadUsersFail(error))
  }
}

export default function * usersSaga() {
  yield takeLatest(Users.LOAD_USERS, handleLoadUsers);
}
