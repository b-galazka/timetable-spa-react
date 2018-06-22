import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import NotFound from '../../src/js/components/NotFound';
import texts from '../../src/json/texts';

Enzyme.configure({ adapter: new Adapter() });

jest.mock(
    '../../src/json/texts',
    () => ({
        title: {
            base: 'base title',
            notFound: 'not found title'
        },
        goHomepage: 'go homepage'
    })
);

jest.mock('../../src/json/errors', () => ({ notFound: 'not found' }));

describe('NotFound component', () => {

    it('should render 404 page', () => {

        const tree = renderer.create(
            <MemoryRouter>
                <NotFound.WrappedComponent location={{ pathname: '/path' }} />
            </MemoryRouter>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    describe('NotFound.prototype.componentDidMount', () => {

        let notFound;

        const title = 'old title';

        beforeEach(() => {

            notFound = shallow(
                <NotFound.WrappedComponent location={{ pathname: '/path' }} />
            ).instance();

            notFound.props = { ...notFound.props };

            document.title = title;
        });

        it('should update title if pathname is not equal to "/"', () => {

            const { title } = texts;

            notFound.componentDidMount();

            expect(document.title).toBe(`${title.base} | ${title.notFound}`);
        });

        it('should not update title if pathname is equal to "/"', () => {

            notFound.props.location.pathname = '/';

            notFound.componentDidMount();

            expect(document.title).toBe(title);
        });
    });
});