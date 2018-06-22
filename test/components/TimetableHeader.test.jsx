import React from 'react';
import renderer from 'react-test-renderer';

import TimetableHeader from '../../src/js/components/TimetableHeader';

jest.mock(
    '../../src/json/urlTranslations',
    () => ({
        teacher: 'teacher',
        class: 'class',
        classroom: 'classroom'
    })
);

describe('TimetableHeader component', () => {

    it('should render class\'s title', () => {

        const tree = renderer.create(
            <TimetableHeader.WrappedComponent

                match={{
                    params: { slug: '%233ET', type: 'class' }
                }}

                teachers={[
                    { slug: 'XYZ', name: null }
                ]}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render classroom\'s title', () => {

        const tree = renderer.create(
            <TimetableHeader.WrappedComponent

                match={{
                    params: { slug: '%23200', type: 'classroom' }
                }}

                teachers={[
                    { slug: 'XYZ', name: null }
                ]}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render teacher\'s title (slug)', () => {

        const tree = renderer.create(
            <TimetableHeader.WrappedComponent

                match={{
                    params: { slug: '%23XYZ', type: 'teacher' }
                }}

                teachers={[
                    { slug: '#XYZ', name: null }
                ]}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render teacher\'s title (name)', () => {

        const tree = renderer.create(
            <TimetableHeader.WrappedComponent

                match={{
                    params: { slug: 'XYZ', type: 'teacher' }
                }}

                teachers={[
                    { slug: 'XYZ', name: 'XYZ name' }
                ]}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});