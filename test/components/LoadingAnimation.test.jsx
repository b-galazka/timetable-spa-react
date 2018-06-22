import React from 'react';
import renderer from 'react-test-renderer';

import LoadingAnimation from '../../src/js/components/LoadingAnimation';

describe('LoadingAnimation component', () => {

    it('should render with default props', () => {

        const tree = renderer.create(<LoadingAnimation />).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render with provided props', () => {

        const tree = renderer.create(
            <LoadingAnimation
                width="200px"
                height="200px"
                color="#AC1F2B"
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});