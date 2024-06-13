import { all, call } from "redux-saga/effects";
import exampleSaga from "./exampleSaga";

function* rootSaga() {
  yield all([call(exampleSaga)]);
}

export default rootSaga;
