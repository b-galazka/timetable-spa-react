import {all, fork} from 'redux-saga/effects';

import rootSaga from '../../src/js/sagas';
import getTimetableObject from '../../src/js/sagas/getTimetableObject';
import getInitialState from '../../src/js/sagas/getInitialState';
import getMobileAppData from '../../src/js/sagas/getMobileAppData';

describe('root saga', () => {

    it('should init all sagas watchers', () => {

        const saga = rootSaga();
        const {value} = saga.next();

        const expectedValue = all([
            fork(getTimetableObject),
            fork(getInitialState),
            fork(getMobileAppData)
        ]);

        expect(value).toEqual(expectedValue);
    });
});