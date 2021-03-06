import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import propTypes from 'prop-types';

import AppMobileLoader from './AppMobileLoader';
import { getMobileAppData } from '../actions/mobileAppData';

import texts from '../../json/texts.json';

import '../../scss/mobileApp.scss';

function mapStateToProps(state) {

    const { data, fetched } = state.mobileAppData;

    return {
        mobileAppData: data,
        mobileAppDataFetched: fetched
    };
}

function mapDisptachToProps(dispatch) {

    return {
        getMobileAppData: bindActionCreators(getMobileAppData, dispatch)
    };
}

class AppMobile extends Component {

    render() {

        const { mobileAppData, mobileAppDataFetched } = this.props;

        return (
            <main className="mobile-app">

                {
                    (mobileAppDataFetched) ?

                        <div className="mobile-app__wrapper">
                            <a
                                className="mobile-app__button button"
                                href={mobileAppData.apkFileUrl}
                                target="_blank" rel="noopener noreferrer"
                            >
                                {texts.downloadApp}
                            </a>

                            <button
                                className="mobile-app__button button"
                                onClick={this.props.visitPage}
                            >
                                {texts.visitPage}
                            </button>
                        </div> :

                        <AppMobileLoader />
                }

            </main>
        );
    }

    componentDidMount() {

        this.props.getMobileAppData();
    }
}

AppMobile.propTypes = {

    visitPage: propTypes.func.isRequired,

    // redux
    mobileAppDataFetched: propTypes.bool.isRequired,
    getMobileAppData: propTypes.func.isRequired,

    mobileAppData(props, propName) {

        if(
            props.mobileAppDataFetched === true &&
            (!props[propName] || typeof props[propName].apkFileUrl !== 'string')
        ) {

            return new Error('props.mobileAppData validation error');
        }
    }
};

AppMobile.defaultProps = {
    mobileAppData: null
};

export default connect(mapStateToProps, mapDisptachToProps)(AppMobile);