import React, {Component} from 'react';
import {connect} from 'react-redux';

import LoadingAnimation from './LoadingAnimation';

import errors from '../../json/errors';

import '../../scss/noContent.scss';

function mapStateToProps(state) {

    const {fetching, fetchingError, notExists} = state.timetableObject;

    return {

        timetableObject: {
            fetching,
            fetchingError,
            notExists
        }    
    };
}

class TimetableLoader extends Component {

    render() {

        return (
            <section className="timetable__loader">
                {this.renderLoaderContent()}
            </section>
        );
    }

    renderLoaderContent() {

        const {timetableObject} = this.props;

        if (timetableObject.fetching) {

            return <LoadingAnimation />;
        } else if (timetableObject.fetchingError) {

            return errors.fetchingError;
        } else if (timetableObject.notExists) {

            return errors.notFound;
        } else {

            return null;
        }
    }
}

export default connect(mapStateToProps)(TimetableLoader);