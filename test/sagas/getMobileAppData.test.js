import { call, takeLatest, put } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

import axios from '../../src/js/axios';
import { REQUESTED } from '../../src/js/constants/mobileAppData';

import getMobileAppDataSagaWatcher, {
    getMobileAppData as getMobileAppDataSaga
} from '../../src/js/sagas/getMobileAppData';

import {
    fetchingMobileAppDataSuccess,
    fetchingMobileAppDataFailure
} from '../../src/js/actions/mobileAppData';

jest.mock(
    'axios',
    () => ({
        get: () => {},
        create() { return this; }
    })
);

describe('getMobileAppData saga', () => {

    const saga = cloneableGenerator(getMobileAppDataSaga)();

    it('should fetch mobile app data', () => {

        const { value } = saga.next();

        expect(value).toEqual(call(axios.get, '/mobile-app'));
    });

    it('should put data to store if mobile app data has been fetched', () => {

        const sagaClone = saga.clone();
        const { value } = sagaClone.next({ data: 'ABC' });

        expect(value).toEqual(put(fetchingMobileAppDataSuccess('ABC')));
    });

    it('should put error to store if error has occured during data fetching', () => {

        const sagaClone = saga.clone();
        const { value } = sagaClone.throw();

        expect(value).toEqual(put(fetchingMobileAppDataFailure()));
    });
});

describe('getMobileAppData saga watcher', () => {

    it('should watch for latest action', () => {

        const watcher = getMobileAppDataSagaWatcher();
        const { value } = watcher.next();

        expect(value).toEqual(takeLatest(REQUESTED, getMobileAppDataSaga));
    });
});