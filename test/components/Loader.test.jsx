import React from 'react';
import renderer from 'react-test-renderer';

import Loader from '../../src/js/components/Loader';

jest.mock('../../src/js/components/LoadingAnimation', () => 'LoadingAnimation');
jest.mock('../../src/json/errors', () => ({ fetchingError: 'fetching error' }));

describe('Loader component', () => {

    it('should render loading animation if there is no fetching error', () => {

        const tree = renderer.create(
            <Loader.WrappedComponent
                initialStateFetchingError={false}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render fetching error', () => {

        const tree = renderer.create(
            <Loader.WrappedComponent
                initialStateFetchingError
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});