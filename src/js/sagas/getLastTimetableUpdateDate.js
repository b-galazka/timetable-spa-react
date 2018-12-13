import { call, put } from 'redux-saga/effects';

import { putLastUpdateDate } from '../actions/timetableObject';
import { fetchingInitialStateFailure } from '../actions/initialState';
import axios from '../axios';

export default function *getLastTimetableUpdateDate() {

    try {

        const { data } = yield call(axios.get, '/timetable/last-update');

        yield put(putLastUpdateDate(data.dateTime));

    } catch (err) {

        yield put(fetchingInitialStateFailure());
    }
}