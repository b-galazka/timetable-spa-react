import { call, takeLatest, put } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

import axios from '../../src/js/axios';
import doesSlugExist from '../../src/js/sagas/doesSlugExist';
import { REQUESTED } from '../../src/js/constants/timetableObject';

import getTimetableObjectSagaWatcher, {
    getTimetableObject as getTimetableObjectSaga
} from '../../src/js/sagas/getTimetableObject';

import {
    fetchingTimetableObjectSuccess,
    fetchingTimetableObjectFailure,
    timetableObjectNotFound
} from '../../src/js/actions/timetableObject';

jest.mock(
    'axios',
    () => ({
        get: () => {},
        create() { return this; }
    })
);

describe('getInitialState saga', () => {

    let sagaWithInvalidSlug;
    let sagaWithFetchingError;

    const sagaParams = { slug: '%23XY', objectType: 'teacher' };
    const saga = cloneableGenerator(getTimetableObjectSaga)(sagaParams);

    it('should check if slug is correct', () => {

        const { slug, objectType } = sagaParams;
        const { value } = saga.next();

        const expectedValue = call(doesSlugExist, {
            slug: decodeURIComponent(slug),
            objectType
        });

        expect(value).toEqual(expectedValue);
    });

    it('should put "not found" error to store if slug is not correct', () => {

        sagaWithInvalidSlug = saga.clone();
        const { value } = sagaWithInvalidSlug.next(false);

        expect(value).toEqual(put(timetableObjectNotFound()));
    });

    it('should return true if slug is not correct', () => {

        const result = sagaWithInvalidSlug.next();

        expect(result).toEqual({ done: true, value: true });
    });

    it('should fetch timetable object', () => {

        const { value } = saga.next(true);

        expect(value).toEqual(call(axios.get, '/teachers/%23XY'));
    });

    it('should correctly pluralize "class" word', () => {

        const saga = getTimetableObjectSaga({slug: 'XY', objectType: 'class'});

        saga.next();

        const { value } = saga.next(true);

        expect(value).toEqual(call(axios.get, '/classes/XY'));
    });

    it('should put error to store if timetable object has not been fetched', () => {

        sagaWithFetchingError = saga.clone();
        const { value } = sagaWithFetchingError.throw();

        expect(value).toEqual(put(fetchingTimetableObjectFailure()));
    });

    it('should return false if timetable object has not been fetched', () => {

        const result = sagaWithFetchingError.next();

        expect(result).toEqual({ done: true, value: false });
    });

    it('should put data to store if timetable object has been fetched', () => {

        const responseMock = {
            data: { a: 'A', b: 'B', c: 'C' }
        };

        const putDataMock = {
            ...responseMock.data,
            type: sagaParams.objectType
        };

        const { value } = saga.next(responseMock);

        expect(value).toEqual(put(fetchingTimetableObjectSuccess(putDataMock)));
    });

    it('should return true if timetable object has been fetched', () => {

        const result = saga.next();

        expect(result).toEqual({ done: true, value: true });
    });
});

describe('getTimetableObject saga watcher', () => {

    it('should watch for latest action', () => {

        const watcher = getTimetableObjectSagaWatcher();
        const { value } = watcher.next();

        expect(value).toEqual(takeLatest(REQUESTED, getTimetableObjectSaga));
    });
});