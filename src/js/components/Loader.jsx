import React from 'react';
import { connect } from 'react-redux';

import LoadingAnimation from './LoadingAnimation';
import errors from '../../json/errors';

import '../../scss/noContent.scss';

function mapStateToProps(state) {

    const { fetchingError } = state.initialState;

    return {
        initialStateFetchingError: fetchingError
    };
}

function Loader({ initialStateFetchingError }) {

    return (
        <section className="app__no-content">

            {
                (initialStateFetchingError) ?

                <p className="app__fetching-error">{errors.fetchingError}</p> :

                <figure>
                    <LoadingAnimation width="120px" height="120px" />
                </figure>
            }

        </section>
    );
}

export default connect(mapStateToProps)(Loader);