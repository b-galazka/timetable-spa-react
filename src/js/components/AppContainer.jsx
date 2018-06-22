import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';

import { getInitialState } from '../actions/initialState';
import { getTimetableObject } from '../actions/timetableObject';

import Content from './Content';
import Loader from './Loader';

import urlTranslations from '../../json/urlTranslations';

function mapStateToProps(state) {

    const { fetched } = state.initialState;

    return {
        initialStateFetched: fetched
    };
}

function mapDispachToProps(dispatch) {

    return {
        getTimetableObject: bindActionCreators(getTimetableObject, dispatch),
        getInitialState: bindActionCreators(getInitialState, dispatch)
    };
}

class AppContainer extends Component {

    render() {

        const { initialStateFetched } = this.props;

        if (initialStateFetched) {
            
            return <Content />;
        }

        return <Loader />;
    }

    componentDidMount() {

        this.fetchInitialState();
    }

    componentWillReceiveProps(nextProps) {

        const { props } = this;
        const { slug, type } = props.match.params;
        const { slug: nextSlug, type: nextType } = nextProps.match.params;

        if (slug !== nextSlug || type !== nextType) {

            props.getTimetableObject({
                objectType: urlTranslations[nextType],
                slug: nextSlug
            });
        }
    }

    fetchInitialState() {

        const { props } = this;
        const { slug, type } = props.match.params;

        props.getInitialState({
            slug,
            objectType: urlTranslations[type]
        });
    }
}

AppContainer.propTypes = {

    // redux
    initialStateFetched: propTypes.bool.isRequired,
    getInitialState: propTypes.func.isRequired,
    getTimetableObject: propTypes.func.isRequired,

    // router
    match: propTypes.shape({
        params: propTypes.shape({
            slug: propTypes.string.isRequired,
            type: propTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default withRouter(connect(mapStateToProps, mapDispachToProps)(AppContainer));