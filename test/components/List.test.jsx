import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import { MemoryRouter } from 'react-router-dom';
import renderer from 'react-test-renderer';

import List from '../../src/js/components/List';

Enzyme.configure({ adapter: new Adapter() });

jest.mock(
    '../../src/json/urlTranslations',
    () => ({
        teacher: 'teacher',
        class: 'class',
        classroom: 'classroom'
    })
);

describe('List component', () => {

    it('should render teachers list', () => {

        const tree = renderer.create(
            <MemoryRouter>
                <List.WrappedComponent
                    onLinkClicked={jest.fn()}
                    type="teacher"
                    classrooms={[]}
                    classes={[]}

                    match={{
                        params: { slug: 'XYZ', type: 'teacher' }
                    }}

                    teachers={[

                        {
                            slug: 'ABC',
                            _id: "1",
                            name: null
                        },

                        {
                            slug: 'XYZ',
                            _id: "2",
                            name: 'XYZ name'
                        },

                        {
                            slug: '#ZZZ',
                            _id: "3",
                            name: 'ZZZ name'
                        }
                    ]}
                />
            </MemoryRouter>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render classes list', () => {

        const tree = renderer.create(
            <MemoryRouter>
                <List.WrappedComponent
                    onLinkClicked={jest.fn()}
                    type="class"
                    classrooms={[]}
                    teachers={[]}

                    match={{
                        params: { slug: '4ET', type: 'class' }
                    }}

                    classes={[

                        {
                            slug: '1AL',
                            _id: "1"
                        },

                        {
                            slug: '4ET',
                            _id: "2"
                        },

                        {
                            slug: '#3ET',
                            _id: "3"
                        }
                    ]}
                />
            </MemoryRouter>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render classrooms list', () => {

        const tree = renderer.create(
            <MemoryRouter>
                <List.WrappedComponent
                    onLinkClicked={jest.fn()}
                    type="classroom"
                    classes={[]}
                    teachers={[]}

                    match={{
                        params: { slug: '200', type: 'classroom' }
                    }}

                    classrooms={[

                        {
                            number: '100',
                            _id: "1"
                        },

                        {
                            number: '200',
                            _id: "2"
                        },

                        {
                            number: '#300',
                            _id: "3"
                        }
                    ]}
                />
            </MemoryRouter>
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should call provided props.onLinkClicked function on link click', () => {

        const onLinkClickedMock = jest.fn();

        const list = mount(
            <MemoryRouter>
                <List.WrappedComponent
                    onLinkClicked={onLinkClickedMock}
                    type="teacher"
                    classes={[]}
                    classrooms={[]}

                    match={{
                        params: { slug: '200', type: 'teacher' }
                    }}

                    teachers={[

                        {
                            slug: 'XYZ',
                            _id: "2",
                            name: 'XYZ name'
                        }
                    ]}
                />
            </MemoryRouter>
        );

        list.find('li a').simulate('click');

        expect(onLinkClickedMock).toHaveBeenCalled();
    });
});