import { all, takeLatest, call, put } from "redux-saga/effects";

import {
  getRepositories,
  setRepositories,
  setRepositoriesError,
} from "./action";

import { searchRepositories } from "./query";

export function* getRepositoriesSaga({ payload }) {
  try {
    const { data } = yield call(searchRepositories, payload);

    yield put(setRepositories(data));
  } catch (err) {
    yield put(setRepositoriesError(err));
  }
}

export default function* repositoriesManagerSaga() {
  yield all([takeLatest(getRepositories, getRepositoriesSaga)]);
}
