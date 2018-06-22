import React from 'react';
import renderer from 'react-test-renderer';
import { MemoryRouter } from 'react-router-dom';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import LessonHour from '../../src/js/components/LessonHour';

Enzyme.configure({ adapter: new Adapter() });

describe('LessonHour component', () => {

    const { userAgent } = navigator;

    it('should render empty table cell', () => {

        const tree = renderer.create(
            <MemoryRouter>
                <LessonHour order={1} />
            </MemoryRouter>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render table cell hidden on mobile phones', () => {

        const tree = renderer.create(
            <MemoryRouter>
                <LessonHour order={1} mobileHidden />
            </MemoryRouter>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render teacher\'s lessons', () => {

        const tree = renderer.create(
            <MemoryRouter>
                <LessonHour
                    timetableObjectType="teacher"
                    order={1}
                    number={1}
                    lessons={[

                        {
                            _id: "1",
                            subject: "math",
                            class: "3ET#",
                            classroom: "200"
                        },

                        {
                            _id: "2",
                            subject: "math",
                            class: "4ET",
                            classroom: "200"
                        }
                    ]}
                />
            </MemoryRouter>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render class\'s lessons', () => {

        const tree = renderer.create(
            <MemoryRouter>
                <LessonHour
                    timetableObjectType="class"
                    order={1}
                    number={1}
                    lessons={[

                        {
                            _id: "1",
                            subject: "math",
                            classroom: "200",
                            teacherSlug: 'XYZ',
                            teacherName: 'XYZ lastname'
                        },

                        {
                            _id: "2",
                            subject: "PE",
                            classroom: "300#",
                            teacherSlug: 'ABC',
                            teacherName: null
                        }
                    ]}
                />
            </MemoryRouter>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render classroom\'s lessons', () => {

        const tree = renderer.create(
            <MemoryRouter>
                <LessonHour
                    timetableObjectType="class"
                    order={1}
                    number={1}
                    lessons={[

                        {
                            _id: "1",
                            subject: "math",
                            class: "3ET",
                            teacherSlug: 'XYZ',
                            teacherName: 'XYZ lastname'
                        },

                        {
                            _id: "2",
                            subject: "PE",
                            class: "4ET",
                            teacherSlug: '#ABC',
                            teacherName: null
                        }
                    ]}
                />
            </MemoryRouter>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should add style.msFlexOrder if app is running on IE10', () => {

        Object.defineProperty(navigator, 'userAgent', {
            value: 'lorem MSIE ipsum',
            configurable: true
        });

        const lessonHour = mount(
            <MemoryRouter>
                <LessonHour order={1} />
            </MemoryRouter>
        );

        const lessonHourStyles = lessonHour.find('.table__cell').getDOMNode().style;

        expect(lessonHourStyles.order).toBe(lessonHourStyles.msFlexOrder);
    });

    it('should add style.msFlexOrder if app is running on IE10 (regex)', () => {

        Object.defineProperty(navigator, 'userAgent', {
            value: 'lorem Tridentxrv:11. ipsum',
            configurable: true
        });

        const lessonHour = mount(
            <MemoryRouter>
                <LessonHour order={1} />
            </MemoryRouter>
        );

        const lessonHourStyles = lessonHour.find('.table__cell').getDOMNode().style;

        expect(lessonHourStyles.order).toBe(lessonHourStyles.msFlexOrder);   
    });

    afterEach(() => {

        Object.defineProperty(navigator, 'userAgent', {
            value: userAgent,
            configurable: true
        });
    });
});