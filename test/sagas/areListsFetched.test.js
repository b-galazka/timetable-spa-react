import { select } from 'redux-saga/effects';
import { cloneableGenerator } from 'redux-saga/utils';

import { fetchingErrorSelector } from '../../src/js/sagasSelectors/initialState';
import areListsFetchedSaga from '../../src/js/sagas/areListsFetched';

describe('areListsFetched saga', () => {

    const saga = cloneableGenerator(areListsFetchedSaga)();

    it('should select fetching error from store', () => {

        const { value } = saga.next();

        expect(value).toEqual(select(fetchingErrorSelector));
    });

    it('should return false if fetching error exists', () => {

        const sagaClone = saga.clone();
        const { value } = sagaClone.next(true);

        expect(value).toEqual(false);
    });

    it('should return true if fetching error doesn not exist', () => {

        const sagaClone = saga.clone();
        const { value } = sagaClone.next(false);

        expect(value).toEqual(true);
    });
});