import { call, put, all, takeLatest } from 'redux-saga/effects';

import {
    fetchingInitialStateFailure,
    fetchingInitialStateSuccess
} from '../actions/initialState';

import { REQUESTED } from '../constants/initialState';
import getObjectsList from './getObjectsList';
import areListsFetched from './areListsFetched';
import getLastTimetableUpdateDate from './getLastTimetableUpdateDate';
import { getTimetableObject } from './getTimetableObject';

export function *getInitialState(params) {

    yield all([
        call(getObjectsList, 'teachers'),
        call(getObjectsList, 'classes'),
        call(getObjectsList, 'classrooms'),
        call(getObjectsList, 'hours'),
        call(getLastTimetableUpdateDate)
    ]);

    if (yield call(areListsFetched)) {

        const fetched = yield call(getTimetableObject, params);

        if (fetched) {

            yield put(fetchingInitialStateSuccess());
        } else {

            yield put(fetchingInitialStateFailure());
        }
    }
}

export default function *getInitialStateWatcher() {

    yield takeLatest(REQUESTED, getInitialState);
}