import { call, put } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

import axios from '../../src/js/axios';
import getObjectsListSaga from '../../src/js/sagas/getObjectsList';
import { putObjectsList } from '../../src/js/actions/lists';
import { fetchingInitialStateFailure } from '../../src/js/actions/initialState';

jest.mock(
    'axios',
    () => ({
        get: () => { },
        create() { return this; }
    })
);

describe('getObjectsList saga', () => {

    const listType = 'teachers';
    const saga = cloneableGenerator(getObjectsListSaga)(listType);

    it('should fetch objects list', () => {

        const { value } = saga.next();

        expect(value).toEqual(call(axios.get, `/${listType}`));
    });

    it('should put data to store if objects list has been fetched', () => {

        const sagaClone = saga.clone();
        const { value } = sagaClone.next({ data: 'ABC' });

        expect(value).toEqual(put(putObjectsList('ABC', listType)));
    });

    it('should put error to store if error has occured during data fetching', () => {

        const sagaClone = saga.clone();
        const { value } = sagaClone.throw();

        expect(value).toEqual(put(fetchingInitialStateFailure()));
    });
});