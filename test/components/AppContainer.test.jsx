import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';

import AppContainer from '../../src/js/components/AppContainer';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../src/js/components/Content', () => 'Content');
jest.mock('../../src/js/components/Loader', () => 'Loader');

jest.mock(
    '../../src/json/urlTranslations',
    () => ({ ABC: 'translated ABC', BCD: 'translated BCD' })
);

describe('AppContainer component', () => {

    let appContainer;

    beforeEach(() => {

        appContainer = shallow(
            <AppContainer.WrappedComponent
                initialStateFetched
                getInitialState={jest.fn()}
                getTimetableObject={jest.fn()}

                match={{
                    params: { slug: '', type: '' }
                }}
            />
        ).instance();

        appContainer.props = { ...appContainer.props };
    });

    it('should render loader if initial data has not been fetched yet', () => {

        const tree = renderer.create(
            <AppContainer.WrappedComponent
                initialStateFetched={false}
                getInitialState={jest.fn()}
                getTimetableObject={jest.fn()}

                match={{
                    params: { slug: '', type: '' }
                }}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render content if initial data has been already fetched', () => {

        const tree = renderer.create(
            <AppContainer.WrappedComponent
                initialStateFetched
                getInitialState={jest.fn()}
                getTimetableObject={jest.fn()}

                match={{
                    params: { slug: '', type: '' }
                }}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    describe('AppContainer.prototype.componentDidMount', () => {

        it('should call props.getInitialState', () => {

            const getInitialStateMock = jest.fn();

            appContainer.props.match.params = { slug: 'XYZ', type: 'ABC' };
            appContainer.props.getInitialState = getInitialStateMock;

            appContainer.componentDidMount();

            expect(getInitialStateMock).toHaveBeenCalledTimes(1);

            expect(getInitialStateMock).toHaveBeenCalledWith({
                slug: 'XYZ',
                objectType: 'translated ABC'
            });
        });
    });

    describe('AppContainer.prototype.componentWillReceiveProps', () => {

        it('should call props.getTimetableObject ' +
            'if `type` url param has been changed', () => {

            const nextProps = {
                match: {
                    params: { type: 'BCD', slug: 'XYZ' }
                }
            };

            const getTimetableObjectMock = jest.fn();

            appContainer.props.match.params = { slug: 'XYZ', type: 'ABC' };
            appContainer.props.getTimetableObject = getTimetableObjectMock;

            appContainer.componentWillReceiveProps(nextProps);

            expect(getTimetableObjectMock).toHaveBeenCalledTimes(1);

            expect(getTimetableObjectMock).toHaveBeenCalledWith({
                slug: 'XYZ',
                objectType: 'translated BCD'
            });
        });

        it('should call props.getTimetableObject ' +
            'if `slug` url param has been changed', () => {

            const nextProps = {
                match: {
                    params: { type: 'ABC', slug: 'ZYX' }
                }
            };

            const getTimetableObjectMock = jest.fn();

            appContainer.props.match.params = { slug: 'XYZ', type: 'ABC' };
            appContainer.props.getTimetableObject = getTimetableObjectMock;

            appContainer.componentWillReceiveProps(nextProps);

            expect(getTimetableObjectMock).toHaveBeenCalledTimes(1);

            expect(getTimetableObjectMock).toHaveBeenCalledWith({
                slug: 'ZYX',
                objectType: 'translated ABC'
            });
        });

        it('should not call props.getTimetableObject ' +
            'if url has not been updated', () => {

            const nextProps = {
                match: {
                    params: { slug: 'XYZ', type: 'ABC' }
                }
            };

            const getTimetableObjectMock = jest.fn();

            appContainer.props.match.params = { slug: 'XYZ', type: 'ABC' };
            appContainer.props.getTimetableObject = getTimetableObjectMock;

            appContainer.componentWillReceiveProps(nextProps);

            expect(getTimetableObjectMock).not.toHaveBeenCalled();
        });
    });
});