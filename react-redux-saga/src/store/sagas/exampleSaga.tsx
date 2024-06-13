import { takeLatest, call, put } from "redux-saga/effects";
import axios, { AxiosResponse } from "axios";
import {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFailure,
} from "../slices/exampleSlice";

type ResponseType = AxiosResponse<any>;

function* fetchDataSaga(): Generator<any, void, ResponseType> {
  try {
    const response: ResponseType = yield call(
      axios.get,
      "https://jsonplaceholder.typicode.com/posts"
    );
    yield put(fetchDataSuccess(response.data));
  } catch (error: any) {
    yield put(fetchDataFailure(error.message));
  }
}

function* exampleSaga(): Generator {
  yield takeLatest(fetchDataRequest.type, fetchDataSaga);
}

export default exampleSaga;
