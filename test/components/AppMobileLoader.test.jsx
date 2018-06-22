import React from 'react';
import renderer from 'react-test-renderer';

import AppMobileLoader from '../../src/js/components/AppMobileLoader';

jest.mock('../../src/js/components/LoadingAnimation', () => 'LoadingAnimation');
jest.mock('../../src/json/errors', () => ({ fetchingError: 'fetching error' }));

describe('AppMobileLoader component', () => { 

    it('should render loading animation if there is no fetching error', () => {

        const tree = renderer.create(
            <AppMobileLoader.WrappedComponent
                mobileAppDataFetchingError={false}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render fetching error', () => {

        const tree = renderer.create(
            <AppMobileLoader.WrappedComponent
                mobileAppDataFetchingError
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});