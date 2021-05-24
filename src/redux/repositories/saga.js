import { all, takeLatest, call, put } from "redux-saga/effects";

import {
  getRepositories,
  setRepositories,
  setRepositoriesError,
} from "./action";

import { searchRepositories } from "./query";

// serive saga
export function* getRepositoriesSaga({ payload }) {
  try {
    const { data } = yield call(searchRepositories, payload); // Call service

    yield put(setRepositories(data)); // Setting success data
  } catch (err) {
    yield put(setRepositoriesError(err)); //Setting error data
  }
}

export default function* repositoriesManagerSaga() {
  yield all([takeLatest(getRepositories, getRepositoriesSaga)]);
}
