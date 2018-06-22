import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';

import Timetable from '../../src/js/components/Timetable';
import { title } from '../../src/json/texts';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../src/js/components/TimetableHeader', () => 'TimetableHeader');
jest.mock('../../src/js/components/TimetableContent', () => 'TimetableContent');
jest.mock('../../src/js/components/TimetableLoader', () => 'TimetableLoader');
jest.mock('../../src/json/urlTranslations', () => ({ teacher: 'teacher' }));

jest.mock(
    '../../src/json/texts',
    () => ({
        title: {
            base: 'base title',
            notFound: 'not found title'
        }
    })
);

describe('Timetable component', () => {

    let timetable;

    beforeEach(() => {

        timetable = shallow(
            <Timetable.WrappedComponent

                teachers={[
                    { slug: 'AB', name: 'AB fullname' },
                    { slug: 'BC', name: null },
                    { slug: '#XY', name: 'XY fullname' }
                ]}

                timetableObject={{
                    fetched: false,
                    fetching: false,
                    notExists: false
                }}

                match={{
                    params: { slug: 'XYZ', type: 'teacher' }
                }}
            />
        ).instance();

        timetable.props = { ...timetable.props };
    });

    it(
        'should render timetable header and timetable content if data has been fetched',
        () => {

            const tree = renderer.create(
                <Timetable.WrappedComponent

                    teachers={[{ slug: 'XYZ', name: null }]}

                    timetableObject={{
                        fetched: true,
                        fetching: false,
                        notExists: false
                    }}

                    match={{
                        params: { slug: 'XYZ', type: 'teacher' }
                    }}
                />
            ).toJSON();

            expect(tree).toMatchSnapshot();
        }
    );

    it(
        'should render timetable header and timetable loader if data is being fetched',
        () => {

            const tree = renderer.create(
                <Timetable.WrappedComponent

                    teachers={[{ slug: 'XYZ', name: null }]}

                    timetableObject={{
                        fetched: false,
                        fetching: true,
                        notExists: false
                    }}

                    match={{
                        params: { slug: 'XYZ', type: 'teacher' }
                    }}
                />
            ).toJSON();

            expect(tree).toMatchSnapshot();
        }
    );

    it('should render only timetable loader if data does not exist', () => {

        const tree = renderer.create(
            <Timetable.WrappedComponent

                teachers={[{ slug: 'XYZ', name: null }]}

                timetableObject={{
                    fetched: false,
                    fetching: false,
                    notExists: true
                }}

                match={{
                    params: { slug: 'XYZ', type: 'teacher' }
                }}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    describe('Timetable.prototype.componentDidMount', () => {

        it('should set 404 title if timetable object does not exist', () => {

            timetable.props.timetableObject.notExists = true;

            timetable.componentDidMount();

            expect(document.title).toBe(`${title.base} | ${title.notFound}`);
        });

        it('should set title to teacher\'s name if this name exists', () => {

            timetable.props.timetableObject.fetched = true;

            timetable.props.match.params = {
                type: 'teacher',
                slug: 'AB'
            };

            timetable.componentDidMount();

            expect(document.title).toBe(`${title.base} | AB fullname`);
        });

        it('should set title to teacher\'s slug if name does not exist', () => {

            timetable.props.timetableObject.fetched = true;

            timetable.props.match.params = {
                type: 'teacher',
                slug: 'BC'
            };

            timetable.componentDidMount();

            expect(document.title).toBe(`${title.base} | BC`);
        });

        it('should set title to slug from URL if current object is not a teacher', () => {

            timetable.props.timetableObject.fetched = true;

            timetable.props.match.params = {
                type: 'class',
                slug: 'XYZ'
            };

            timetable.componentDidMount();

            expect(document.title).toBe(`${title.base} | XYZ`);
        });

        it('should encode slug from URL', () => {

            timetable.props.timetableObject.fetched = true;

            timetable.props.match.params = {
                type: 'class',
                slug: '%23XY'
            };

            timetable.componentDidMount();

            expect(document.title).toBe(`${title.base} | #XY`);
        });

        it('should encode teacher\'s slug', () => {

            timetable.props.timetableObject.fetched = true;

            timetable.props.match.params = {
                type: 'teacher',
                slug: '%23XY'
            };

            timetable.componentDidMount();

            expect(document.title).toBe(`${title.base} | XY fullname`);
        });
    });

    afterEach(() => {

        document.title = 'default title';
    });
});