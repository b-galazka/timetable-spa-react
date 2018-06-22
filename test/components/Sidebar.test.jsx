import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';

import Sidebar from '../../src/js/components/Sidebar';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../src/js/components/List', () => 'List');

jest.mock(
    '../../src/json/urlTranslations',
    () => ({
        teacher: 'teacher',
        class: 'class',
        classroom: 'classroom'
    })
);

jest.mock(
    '../../src/json/buttonsTexts',
    () => ({
        teacher: 'Teachers',
        class: 'Classes',
        classroom: 'Classrooms'
    })
);

function getButton(root, buttonType) {

    return root.findWhere(
        el => el.hasClass('sidebar__button') && el.text().toLowerCase() === buttonType
    );
}

describe('Sidebar component', () => {

    it('should render teachers list', () => {

        const tree = renderer.create(
            <Sidebar.WrappedComponent
                match={{
                    params: { type: 'teacher' }
                }}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render classes list', () => {

        const tree = renderer.create(
            <Sidebar.WrappedComponent
                match={{
                    params: { type: 'class' }
                }}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render classrooms list', () => {

        const tree = renderer.create(
            <Sidebar.WrappedComponent
                match={{
                    params: { type: 'classroom' }
                }}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should switch to the classes list on classes button click', () => {

        const sidebar = mount(
            <Sidebar.WrappedComponent
                match={{
                    params: { type: 'teacher' }
                }}
            />
        );

        getButton(sidebar, 'classes').simulate('click');

        expect(sidebar.find('List').prop('type')).toBe('class');
    });

    it('should switch to the classrooms list on classrooms button click', () => {

        const sidebar = mount(
            <Sidebar.WrappedComponent
                match={{
                    params: { type: 'teacher' }
                }}
            />
        );

        getButton(sidebar, 'classrooms').simulate('click');

        expect(sidebar.find('List').prop('type')).toBe('classroom');
    });

    it('should switch to the teachers list on teachers button click', () => {

        const sidebar = mount(
            <Sidebar.WrappedComponent
                match={{
                    params: { type: 'class' }
                }}
            />
        );

        getButton(sidebar, 'teachers').simulate('click');

        expect(sidebar.find('List').prop('type')).toBe('teacher');
    });

    it('should add "active" class to classes button on classes button click', () => {

        const sidebar = mount(
            <Sidebar.WrappedComponent
                match={{
                    params: { type: 'teacher' }
                }}
            />
        );

        getButton(sidebar, 'classes').simulate('click');

        const hasActiveClass = getButton(sidebar, 'classes')
            .hasClass('sidebar__button--active');

        expect(hasActiveClass).toBe(true);
    });

    it('should add "active" class to classrooms button on classrooms button click', () => {

        const sidebar = mount(
            <Sidebar.WrappedComponent
                match={{
                    params: { type: 'teacher' }
                }}
            />
        );

        getButton(sidebar, 'classrooms').simulate('click');

        const hasActiveClass = getButton(sidebar, 'classrooms')
            .hasClass('sidebar__button--active');

        expect(hasActiveClass).toBe(true);
    });

    it('should add "active" class to teachers button on teachers button click', () => {

        const sidebar = mount(
            <Sidebar.WrappedComponent
                match={{
                    params: { type: 'class' }
                }}
            />
        );

        getButton(sidebar, 'teachers').simulate('click');

        const hasActiveClass = getButton(sidebar, 'teachers')
            .hasClass('sidebar__button--active');

        expect(hasActiveClass).toBe(true);
    });

    it('should remove "active" class from prev button on classes button click', () => {

        const sidebar = mount(
            <Sidebar.WrappedComponent
                match={{
                    params: { type: 'teacher' }
                }}
            />
        );

        getButton(sidebar, 'classes').simulate('click');

        const prevButtonHasActiveClass = getButton(sidebar, 'teachers')
            .hasClass('sidebar__button--active');

        expect(prevButtonHasActiveClass).toBe(false);
    });

    it('should remove "active" class from prev button on classrooms button click', () => {

        const sidebar = mount(
            <Sidebar.WrappedComponent
                match={{
                    params: { type: 'teacher' }
                }}
            />
        );

        getButton(sidebar, 'classrooms').simulate('click');

        const prevButtonHasActiveClass = getButton(sidebar, 'teachers')
            .hasClass('sidebar__button--active');

        expect(prevButtonHasActiveClass).toBe(false);
    });

    it('should remove "active" class from prev button on teachers button click', () => {

        const sidebar = mount(
            <Sidebar.WrappedComponent
                match={{
                    params: { type: 'class' }
                }}
            />
        );

        getButton(sidebar, 'teachers').simulate('click');

        const prevButtonHasActiveClass = getButton(sidebar, 'classes')
            .hasClass('sidebar__button--active');

        expect(prevButtonHasActiveClass).toBe(false);
    });

    it('should open sidebar on mobile trigger click', () => {

        const sidebar = mount(
            <Sidebar.WrappedComponent
                match={{
                    params: { type: 'class' }
                }}
            />
        );

        const mobileTrigger = sidebar.find('.sidebar__mobile-trigger');

        mobileTrigger.simulate('click');

        expect(sidebar.find('.sidebar').hasClass('sidebar--mobile-opened')).toBe(true);
    });

    it('should close sidebar on mobile trigger click if it has been already opened', () => {

        const sidebar = mount(
            <Sidebar.WrappedComponent
                match={{
                    params: { type: 'class' }
                }}
            />
        );

        const mobileTrigger = sidebar.find('.sidebar__mobile-trigger');

        mobileTrigger.simulate('click');
        mobileTrigger.simulate('click');

        expect(sidebar.find('.sidebar').hasClass('sidebar--mobile-opened')).toBe(false);
    });

    it('should add "active" class to mobile trigger on mobile trigger click', () => {

        const sidebar = mount(
            <Sidebar.WrappedComponent
                match={{
                    params: { type: 'class' }
                }}
            />
        );

        const mobileTrigger = sidebar.find('.sidebar__mobile-trigger');

        mobileTrigger.simulate('click');

        const isMobileTriggerActive = sidebar.find('.sidebar__mobile-trigger')
            .hasClass('sidebar__mobile-trigger--sidebar-opened');

        expect(isMobileTriggerActive).toBe(true);
    });

    it('should remove "active" class to mobile trigger on mobile trigger click', () => {

        const sidebar = mount(
            <Sidebar.WrappedComponent
                match={{
                    params: { type: 'class' }
                }}
            />
        );

        const mobileTrigger = sidebar.find('.sidebar__mobile-trigger');

        mobileTrigger.simulate('click');
        mobileTrigger.simulate('click');

        const isMobileTriggerActive = sidebar.find('.sidebar__mobile-trigger')
            .hasClass('sidebar__mobile-trigger--sidebar-opened');

        expect(isMobileTriggerActive).toBe(false);
    });
});