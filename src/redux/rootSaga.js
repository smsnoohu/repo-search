import { all } from "redux-saga/effects";
import repositories from "./repositories/saga";

function* rootSaga() {
  yield all([repositories()]);
}

export default rootSaga;
