import {select} from 'redux-saga/effects';

export default function *areListsFetched() {

    const fetchingError = yield select(fetchingErrorSelector);

    return (!fetchingError);
}