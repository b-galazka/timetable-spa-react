import {all, call, takeLatest, put} from 'redux-saga/effects';
import {cloneableGenerator} from 'redux-saga/utils';

import getObjectsListSaga from '../../src/js/sagas/getObjectsList';
import areListsFetchedSaga from '../../src/js/sagas/areListsFetched';
import {REQUESTED} from '../../src/js/constants/initialState';

import getInitialStateSagaWatcher, {
    getInitialState as getInitialStateSaga
} from '../../src/js/sagas/getInitialState';

import {
    getTimetableObject as getTimetableObjectSaga
} from '../../src/js/sagas/getTimetableObject';

import {
    fetchingInitialStateSuccess,
    fetchingInitialStateFailure
} from '../../src/js/actions/initialState';

jest.mock(
    '../../src/js/sagas/getObjectsList',
    () => function *getObjectsListMock() {}
);

jest.mock(
    '../../src/js/sagas/getTimetableObject',
    () => ({
        getTimetableObject: function *getTimetableObject() {}
    })
);

describe('getInitialState saga', () => {

    const sagaParams = {slug: 'XY', objectType: 'teacher'};
    const saga = cloneableGenerator(getInitialStateSaga)(sagaParams);

    it('should fetch all lists in parallel', () => {

        const {value} = saga.next();

        const expectedValue = all([
            call(getObjectsListSaga, 'teachers'),
            call(getObjectsListSaga, 'classes'),
            call(getObjectsListSaga, 'classrooms'),
            call(getObjectsListSaga, 'hours')
        ]);

        expect(value).toEqual(expectedValue);
    });

    it('should check if all lists have been correctly fetched', () => {

        const {value} = saga.next();

        expect(value).toEqual(call(areListsFetchedSaga));
    });

    it('should finish work if lists have not been correctly fetched', () => {

        const sagaClone = saga.clone();
        const {done} = sagaClone.next(false);

        expect(done).toEqual(true);
    });

    it('should fetch timetable object if lists have been correvtly fetched ', () => {

        const {value} = saga.next(true);

        expect(value).toEqual(call(getTimetableObjectSaga, sagaParams));
    });

    it('should put data to store if timetable object has been fetched', () => {

        const sagaClone = saga.clone();
        const {value} = sagaClone.next(true);

        expect(value).toEqual(put(fetchingInitialStateSuccess()));
    });

    it('should put error to store if timetable object has not been fetched', () => {

        const sagaClone = saga.clone();
        const {value} = sagaClone.next(false);

        expect(value).toEqual(put(fetchingInitialStateFailure()));
    });
});

describe('getInitialState saga watcher', () => {

    it('should watch for latest action', () => {

        const watcher = getInitialStateSagaWatcher();
        const {value} = watcher.next();

        expect(value).toEqual(takeLatest(REQUESTED, getInitialStateSaga));
    });
});