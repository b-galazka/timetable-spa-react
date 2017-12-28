import {call, put, takeLatest, select} from 'redux-saga/effects';

import {
    fetchingTimetableObjectSuccess,
    fetchingTimetableObjectFailure,
    timetableObjectNotFound
} from '../actions/timetableObject';

import {REQUESTED} from '../constants/timetableObject';
import axios from './axios';

function *doesSlugExist({slug, objectType}) {

    const {classes, classrooms, teachers} = yield select();

    const doesContainSlug = item => item.slug === slug || item.number === slug;

    switch (objectType) {

        case 'teacher':
            return teachers.some(doesContainSlug);

        case 'class':
            return classes.some(doesContainSlug);

        case 'classroom':
            return classrooms.some(doesContainSlug);

        default:
            return false;
    }
}

function pluralize(str) {

    return `${str}${(str === 'class') ? 'e' : ''}s`;
}

export function *getTimetableObject({objectType, slug}) {

    const isCorrectSlug = yield call(doesSlugExist, {
        slug: decodeURIComponent(slug), 
        objectType
    });

    if (isCorrectSlug) {

        try {

            const response = yield call(axios.get, `/${pluralize(objectType)}/${slug}`);

            yield put(fetchingTimetableObjectSuccess(response.data));

            return true;
        } catch (err) {

            yield put(fetchingTimetableObjectFailure());

            return false;
        }
    } else {

        yield put(timetableObjectNotFound());

        return true;
    }    
}

export default function *getTimetableObjectWatcher() {

    yield takeLatest(REQUESTED, getTimetableObject);
}