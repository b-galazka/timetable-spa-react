import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';

import TimetableContent from '../../src/js/components/TimetableContent';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../src/js/components/Table', () => 'Table');
jest.mock('../../src/json/texts', () => ({ lastModified: 'last modified' }));

describe('TimetableContent component', () => {

    it('should render with date in valid format', () => {

        const tree = renderer.create(
            <TimetableContent.WrappedComponent
                lastModified="Thu Dec 20 2018 10:47:46 GMT+0100"
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render with date in DD/MM/YYYY HH:MM format', () => {

        const tree = renderer.create(
            <TimetableContent.WrappedComponent
                lastModified="Sat Jun 02 2018 09:05:46 GMT+0200"
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should remove "animated" CSS class when animation is finished', () => {

        const content = mount(
            <TimetableContent.WrappedComponent
                lastModified="Thu Dec 20 2018 10:47:46 GMT+0100"
            />
        );

        content.find('.timetable__wrapper').simulate('animationEnd');

        expect(content.find('.timetable__wrapper').hasClass('animated')).toBe(false);
    });
});