import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import renderer from 'react-test-renderer';

import AppMobile from '../../src/js/components/AppMobile';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('../../src/js/components/AppMobileLoader', () => 'AppMobileLoader');

jest.mock(
    '../../src/json/texts',
    () => ({ downloadApp: 'download app', visitPage: 'visit page' })
);

describe('AppMobile component', () => {

    let appMobile;

    beforeEach(() => {

        appMobile = shallow(
            <AppMobile.WrappedComponent
                visitPage={jest.fn()}
                mobileAppDataFetched={false}
                getMobileAppData={jest.fn()}
            />
        ).instance();

        appMobile.props = { ...appMobile.props };
    });

    it('should render loader if mobile app data has not been fetched yet', () => {

        const tree = renderer.create(
            <AppMobile.WrappedComponent
                visitPage={jest.fn()}
                mobileAppDataFetched={false}
                getMobileAppData={jest.fn()}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should render page if mobile app data has been already fetched', () => {

        const tree = renderer.create(
            <AppMobile.WrappedComponent
                visitPage={jest.fn()}
                mobileAppDataFetched
                getMobileAppData={jest.fn()}
                mobileAppData={{ apkFileUrl: 'apk file url' }}
            />
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    it('should call props.visitPage method on button click', () => {

        const visitPageMock = jest.fn();

        const appMobile = mount(
            <AppMobile.WrappedComponent
                visitPage={visitPageMock}
                mobileAppDataFetched
                getMobileAppData={jest.fn()}
                mobileAppData={{ apkFileUrl: 'apk file url' }}
            />
        );

        appMobile.find('button.mobile-app__button').simulate('click');

        expect(visitPageMock).toHaveBeenCalledTimes(1);
    });

    describe('AppMobile.prototype.componentDidMount', () => {

        it('should call props.getMobileAppData method', () => {

            const getMobileAppDataMock = jest.fn();

            appMobile.props.getMobileAppData = getMobileAppDataMock;

            appMobile.componentDidMount();

            expect(getMobileAppDataMock).toHaveBeenCalledTimes(1);
        });
    });
});