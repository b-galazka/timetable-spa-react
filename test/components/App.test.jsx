import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import App from '../../src/js/components/App';

jest.mock('../../src/js/components/AppMobile', () => 'AppMobile');
jest.mock('../../src/js/components/NotFound', () => 'NotFound');
jest.mock('../../src/json/urlTranslations', () => ({ types: ['a'] }));
jest.mock('../../src/json/urls', () => ({ defaultRedirection: '/redirected' }));
jest.mock('../../src/js/components/AppContainer', () => 'AppContainer');

describe('App component', () => {

    it('should render mobile version if app is running on android device', () => {

        const { userAgent } = navigator;

        Object.defineProperty(navigator, 'userAgent', {
            value: 'lorem Android ipsum',
            configurable: true
        });

        const tree = renderer.create(<App />).toJSON();

        expect(tree).toMatchSnapshot();

        Object.defineProperty(navigator, 'userAgent', {
            value: userAgent,
            configurable: true
        });
    });

    it('should render notFound page if URL is invalid', () => {

        const tree = renderer.create(
            <MemoryRouter initialEntries={['/unknown-url']}>
                <App />
            </MemoryRouter>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render notFound page if timetable object type is invalid', () => {

        const tree = renderer.create(
            <MemoryRouter initialEntries={['/b/c']}>
                <App />
            </MemoryRouter>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render AppContiner if url is valid', () => {

        const tree = renderer.create(
            <MemoryRouter initialEntries={['/a/c']}>
                <App />
            </MemoryRouter>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should redirect from "/" to URL set in config file', () => {

        const tree = renderer.create(
            <MemoryRouter initialEntries={['/']}>
                <App />
            </MemoryRouter>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});