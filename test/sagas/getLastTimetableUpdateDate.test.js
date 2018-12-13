import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

import axios from '../../src/js/axios';
import getLastTimetableUpdateDateSaga from '../../src/js/sagas/getLastTimetableUpdateDate';
import { putLastUpdateDate } from '../../src/js/actions/timetableObject';
import { fetchingInitialStateFailure } from '../../src/js/actions/initialState';

jest.mock(
    'axios',
    () => ({
        get: () => { },
        create() { return this; }
    })
);

describe('getLastTimetableUpdateDate saga', () => {

    const saga = cloneableGenerator(getLastTimetableUpdateDateSaga)();

    it('should fetch last timetable update date', () => {

        const { value } = saga.next();

        expect(value).toEqual(call(axios.get, '/timetable/last-update'));
    });

    it('should put data to store if last update date has been fetched', () => {

        const responseMock = {
            data: { dateTime: new Date() }
        };

        const sagaClone = saga.clone();
        const { value } = sagaClone.next(responseMock);

        expect(value).toEqual(put(putLastUpdateDate(responseMock.data.dateTime)));
    });

    it('should put error to store if error has occured during data fetching', () => {

        const sagaClone = saga.clone();
        const { value } = sagaClone.throw();

        expect(value).toEqual(put(fetchingInitialStateFailure()));
    });
});