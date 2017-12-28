import {all, fork} from 'redux-saga/effects';

import getTimetableObject from './getTimetableObject';
import getInitialState from './getInitialState';

export default function *rootSaga() {

    yield all([
        fork(getTimetableObject),
        fork(getInitialState)
    ]);
}