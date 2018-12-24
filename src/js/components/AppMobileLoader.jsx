import React from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';

import LoadingAnimation from './LoadingAnimation';
import errors from '../../json/errors';

import '../../scss/mobileAppLoader.scss';

function mapStateToProps(state) {

    const { fetchingError } = state.mobileAppData;

    return {
        mobileAppDataFetchingError: fetchingError
    };
}

function AppMobileLoader({ mobileAppDataFetchingError }) {

    return (
        <section className="mobile-app__loader">

            {
                (mobileAppDataFetchingError) ?

                    <p className="mobile-app__fetching-error">{errors.fetchingError}</p> :

                    <figure>
                        <LoadingAnimation width="120px" height="120px" />
                    </figure>
            }

        </section>
    );
}

AppMobileLoader.propTypes = {
    // redux
    mobileAppDataFetchingError: propTypes.bool.isRequired
};

export default connect(mapStateToProps)(AppMobileLoader);