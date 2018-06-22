import { select } from 'redux-saga/effects';

import { fetchingErrorSelector } from '../sagasSelectors/initialState';

export default function *areListsFetched() {

    const fetchingError = yield select(fetchingErrorSelector);

    return (!fetchingError);
}