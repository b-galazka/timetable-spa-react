import {select} from 'redux-saga/effects';

import doesSlugExistSaga from '../../src/js/sagas/doesSlugExist';

describe('doesSlugExist saga', () => {

    const selectedData = {
        teachers: [{ slug: 'XY' }],
        classes: [{ slug: 'XY' }],
        classrooms: [{ number: '300' }]
    };

    it('should select data from store', () => {

        const saga = doesSlugExistSaga({});
        const {value} = saga.next();

        expect(value).toEqual(select());
    });

    it('should return true if teacher\'s slug exists', () => {

        const saga = doesSlugExistSaga({slug: 'XY', objectType: 'teacher'});

        saga.next();

        const {value} = saga.next(selectedData);

        expect(value).toEqual(true);
    });

    it('should return false if teacher\'s slug does not exist', () => {

        const saga = doesSlugExistSaga({ slug: 'XYZ', objectType: 'teacher' });

        saga.next();

        const {value} = saga.next(selectedData);

        expect(value).toEqual(false);
    });

    it('should return true if class\'s slug exists', () => {

        const saga = doesSlugExistSaga({ slug: 'XY', objectType: 'class' });

        saga.next();

        const { value } = saga.next(selectedData);

        expect(value).toEqual(true);
    });

    it('should return false if class\'s slug does not exist', () => {

        const saga = doesSlugExistSaga({ slug: 'XYZ', objectType: 'class' });

        saga.next();

        const { value } = saga.next(selectedData);

        expect(value).toEqual(false);
    });

    it('should return true if classroom\'s number exists', () => {

        const saga = doesSlugExistSaga({ slug: '300', objectType: 'classroom' });

        saga.next();

        const {value} = saga.next(selectedData);

        expect(value).toEqual(true);
    });

    it('should return false if classroom\'s number does not exist', () => {

        const saga = doesSlugExistSaga({ slug: '400', objectType: 'classroom' });

        saga.next();

        const {value} = saga.next(selectedData);

        expect(value).toEqual(false);
    });

    it('should return false if unknown objectType has been provided', () => {

        const saga = doesSlugExistSaga({ slug: 'XY', objectType: 'objectType' });

        saga.next();

        const {value} = saga.next(selectedData);

        expect(value).toEqual(false);
    });
});