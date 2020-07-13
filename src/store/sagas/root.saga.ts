import { all } from "redux-saga/effects";
import usersSaga from "./user.saga";

export default function* rootSaga() {
  yield all([usersSaga()]);
}
