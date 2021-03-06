import { call, put, takeLatest } from 'redux-saga/effects';

import {
    fetchingTimetableObjectSuccess,
    fetchingTimetableObjectFailure,
    timetableObjectNotFound
} from '../actions/timetableObject';

import doesSlugExist from './doesSlugExist';
import { REQUESTED } from '../constants/timetableObject';
import axios from '../axios';

function pluralize(str) {

    return `${str}${(str === 'class') ? 'e' : ''}s`;
}

export function *getTimetableObject({ objectType, slug }) {

    const isCorrectSlug = yield call(doesSlugExist, {
        slug: decodeURIComponent(slug),
        objectType
    });

    if (isCorrectSlug) {

        try {

            const { data } = yield call(axios.get, `/${pluralize(objectType)}/${slug}`);

            yield put(fetchingTimetableObjectSuccess({ ...data, type: objectType }));

        } catch (err) {

            yield put(fetchingTimetableObjectFailure());

            return false;
        }
    } else {

        yield put(timetableObjectNotFound());
    }

    return true;
}

export default function *getTimetableObjectWatcher() {

    yield takeLatest(REQUESTED, getTimetableObject);
}