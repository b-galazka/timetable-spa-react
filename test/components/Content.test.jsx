import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';

import Content from '../../src/js/components/Content';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../src/js/components/Sidebar', () => 'Sidebar');
jest.mock('../../src/js/components/Timetable', () => 'Timetable');

describe('Content component', () => {

    it('should render Sidebar and Timetable', () => {

        const tree = renderer.create(<Content />).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should remove "animated" CSS class when animation is finished', () => {

        const content = mount(<Content />);

        content.find('.app__wrapper').simulate('animationEnd');

        expect(content.find('.app__wrapper').hasClass('animated')).toBe(false);
    });
});