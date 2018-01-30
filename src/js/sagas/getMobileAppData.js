import {call, put, takeLatest} from 'redux-saga/effects';

import {
    fetchingMobileAppDataSuccess,
    fetchingMobileAppDataFailure
} from '../actions/mobileAppData';

import {REQUESTED} from '../constants/mobileAppData';
import axios from './axios';

function *getMobileAppData() {

    try {

        const response = yield call(axios.get, '/mobile-app');

        yield put(fetchingMobileAppDataSuccess(response.data));
    } catch (err) {

        yield put(fetchingMobileAppDataFailure());
    }
}

export default function *getMobileAppDataWatcher() {

    yield takeLatest(REQUESTED, getMobileAppData);
}