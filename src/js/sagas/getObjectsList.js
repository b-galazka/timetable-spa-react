import { call, put } from 'redux-saga/effects';

import { putObjectsList } from '../actions/lists';
import { fetchingInitialStateFailure } from '../actions/initialState';
import axios from '../axios';

export default function *getObjectsList(type) {

    try {

        const response = yield call(axios.get, `/${type}`);

        yield put(putObjectsList(response.data, type));
    } catch (err) {

        yield put(fetchingInitialStateFailure());
    }
}