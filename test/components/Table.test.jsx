import React from 'react';
import renderer from 'react-test-renderer';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import Table from '../../src/js/components/Table';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../src/js/components/LessonHour', () => 'LessonHour');

jest.mock(
    '../../src/json/texts',
    () => ({
        number: 'number',
        hour: 'hour',
        days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
    })
);

describe('Table component', () => {

    const { userAgent } = navigator;

    const hours = [
        { start: '1:00', end: '2:00', _id: 'hour1' },
        { start: '2:00', end: '3:00', _id: 'hour2' },
        { start: '3:00', end: '4:00', _id: 'hour3' },
        { start: '4:00', end: '5:00', _id: 'hour4' },
        { start: '5:00', end: '6:00', _id: 'hour5' }
    ];

    const teacherTimetableObject = {
        timetable: [
            [
                [
                    {
                        subject: 'math',
                        class: '3ET',
                        classroom: '200',
                        _id: 'lesson1'
                    },
                    {
                        subject: 'math',
                        class: '4ET',
                        classroom: '200',
                        _id: 'lesson2'
                    }
                ]
            ],
            [],
            [
                [null],
                [
                    {
                        subject: 'math',
                        class: '3ET',
                        classroom: '200',
                        _id: 'lesson1'
                    }
                ],
                [
                    {
                        subject: 'math',
                        class: '4ET',
                        classroom: '200',
                        _id: 'lesson2'
                    }
                ],
                [
                    {
                        subject: 'math',
                        class: '4ET',
                        classroom: '200',
                        _id: 'lesson2'
                    }
                ]
            ],
            [],
            []
        ],

        type: 'teacher'
    };

    it('should render teacher\'s timetable', () => {

        const tree = renderer.create(
            <Table.WrappedComponent
                hours={hours}
                timetableObject={teacherTimetableObject}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render class\'s timetable', () => {

        const tree = renderer.create(
            <Table.WrappedComponent

                hours={hours}

                timetableObject={{
                    timetable: [
                        [
                            [
                                {
                                    subject: 'math',
                                    teacherSlug: 'AB',
                                    teacherName: 'AB name',
                                    classroom: '200',
                                    _id: 'lesson1'
                                }
                            ],
                            [
                                {
                                    subject: 'math',
                                    teacherSlug: 'AB',
                                    teacherName: 'AB name',
                                    classroom: '200',
                                    _id: 'lesson2'
                                }
                            ]
                        ],
                        [],
                        [
                            [null],
                            [
                                {
                                    subject: 'math',
                                    teacherSlug: 'AB',
                                    teacherName: null,
                                    classroom: '200',
                                    _id: 'lesson1'
                                }
                            ],
                            [
                                {
                                    subject: 'math',
                                    teacherSlug: 'XY',
                                    teacherName: 'XY name',
                                    classroom: '200',
                                    _id: 'lesson2'
                                }
                            ],
                            [
                                {
                                    subject: 'math',
                                    teacherSlug: 'XYZ',
                                    teacherName: null,
                                    classroom: '200',
                                    _id: 'lesson2'
                                }
                            ]
                        ],
                        [],
                        []
                    ],

                    type: 'class'
                }}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render classroom\'s timetable', () => {

        const tree = renderer.create(
            <Table.WrappedComponent

                hours={hours}

                timetableObject={{
                    timetable: [
                        [
                            [
                                {
                                    subject: 'math',
                                    teacherSlug: 'AB',
                                    teacherName: 'AB name',
                                    class: '3ET',
                                    _id: 'lesson1'
                                }
                            ],
                            [
                                {
                                    subject: 'math',
                                    teacherSlug: 'AB',
                                    teacherName: 'AB name',
                                    class: '4ET',
                                    _id: 'lesson2'
                                }
                            ]
                        ],
                        [],
                        [
                            [null],
                            [
                                {
                                    subject: 'math',
                                    teacherSlug: 'AB',
                                    teacherName: null,
                                    class: '1AL',
                                    _id: 'lesson1'
                                }
                            ],
                            [
                                {
                                    subject: 'math',
                                    teacherSlug: 'XY',
                                    teacherName: 'XY name',
                                    class: '3BL',
                                    _id: 'lesson2'
                                }
                            ],
                            [
                                {
                                    subject: 'math',
                                    teacherSlug: 'XYZ',
                                    teacherName: null,
                                    class: '3CT',
                                    _id: 'lesson2'
                                }
                            ]
                        ],
                        [],
                        []
                    ],

                    type: 'classroom'
                }}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should add style.msFlexOrder to all table cells ' +
        'if app is running on IE10', () => {

        Object.defineProperty(navigator, 'userAgent', {
            value: 'lorem MSIE ipsum',
            configurable: true
        });

        const table = mount(
            <Table.WrappedComponent
                hours={hours}
                timetableObject={teacherTimetableObject}
            />
        );

        const everyCellHasPrefix = Array.prototype.every.call(
            table.find('.table__cell'),
            (elem) => {

                const elemStyles = elem.getDOMNode().style;

                return (elemStyles.order === elemStyles.msFlexOrder);
            }
        );

        expect(everyCellHasPrefix).toBe(true);
    });

    it('should add style.msFlexOrder to all table cells ' +
        'if app is running on IE10 (regex)', () => {

        Object.defineProperty(navigator, 'userAgent', {
            value: 'lorem Tridentxrv:11. ipsum',
            configurable: true
        });

        const table = mount(
            <Table.WrappedComponent
                hours={hours}
                timetableObject={teacherTimetableObject}
            />
        );

        const everyCellHasPrefix = Array.prototype.every.call(
            table.find('.table__cell'),
            (elem) => {

                const elemStyles = elem.getDOMNode().style;

                return (elemStyles.order === elemStyles.msFlexOrder);
            }
        );

        expect(everyCellHasPrefix).toBe(true);
    });

    afterEach(() => {

        Object.defineProperty(navigator, 'userAgent', {
            value: userAgent,
            configurable: true
        });
    });
});