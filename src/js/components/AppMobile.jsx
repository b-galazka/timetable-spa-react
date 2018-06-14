import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import AppMobileLoader from './AppMobileLoader';
import {getMobileAppData} from '../actions/mobileAppData';

import texts from '../../json/texts.json';

import '../../scss/mobileApp.scss';

function mapStateToProps(state) {

    const {data, fetched} = state.mobileAppData;

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

    constructor() {

        super();

        this.visitPage = this.visitPage.bind(this);
    }

    render() {

        const {mobileAppData, mobileAppDataFetched} = this.props;

        return (
            <main className="mobile-app">

                {
                    (mobileAppDataFetched) ?

                    <div className="mobile-app__wrapper">
                        <a
                            className="mobile-app__button button"
                            href={mobileAppData.apkFileUrl}
                            target="_blank"
                        >
                            {texts.downloadApp}
                        </a>

                        <button
                            className="mobile-app__button button"
                            onClick={this.visitPage}
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

    visitPage() {

        this.props.visitPage();
    }
}

export default connect(mapStateToProps, mapDisptachToProps)(AppMobile);