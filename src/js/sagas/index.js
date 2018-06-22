import { all, fork } from 'redux-saga/effects';

import getTimetableObject from './getTimetableObject';
import getInitialState from './getInitialState';
import getMobileAppData from './getMobileAppData';

export default function *rootSaga() {

    yield all([
        fork(getTimetableObject),
        fork(getInitialState),
        fork(getMobileAppData)
    ]);
}