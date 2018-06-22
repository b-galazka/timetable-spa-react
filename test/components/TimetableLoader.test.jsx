import React from 'react';
import renderer from 'react-test-renderer';

import TimetableLoader from '../../src/js/components/TimetableLoader';

jest.mock('../../src/js/components/LoadingAnimation', () => 'LoadingAnimation');

jest.mock(
    '../../src/json/errors',
    () => ({ fetchingError: 'fetching error', notFound: 'not found' })
);

describe('TimetableLoader component', () => {

    it('should render loading animation if data has not been fetched yet', () => {

        const tree = renderer.create(
            <TimetableLoader.WrappedComponent
                timetableObject={{
                    fetching: true,
                    fetchingError: false,
                    notExists: false
                }}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render fetching error if it has occured during data fetching', () => {

        const tree = renderer.create(
            <TimetableLoader.WrappedComponent
                timetableObject={{
                    fetching: false,
                    fetchingError: true,
                    notExists: false
                }}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render "not found" error if timetable object does not exist', () => {

        const tree = renderer.create(
            <TimetableLoader.WrappedComponent
                timetableObject={{
                    fetching: false,
                    fetchingError: false,
                    notExists: true
                }}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});