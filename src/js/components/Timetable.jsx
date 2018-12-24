import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';

import TimetableLoader from './TimetableLoader';
import TimetableHeader from './TimetableHeader';
import TimetableContent from './TimetableContent';

import texts from '../../json/texts';
import urlTranslations from '../../json/urlTranslations';

import '../../scss/timetable.scss';

function mapStateToProps(state) {

    const { fetched, notExists, fetching } = state.timetableObject;

    return {

        timetableObject: {
            fetched,
            fetching,
            notExists
        },

        teachers: state.teachers
    };
}

class Timetable extends Component {

    render() {

        const { fetched, notExists } = this.props.timetableObject;

        return (
            <section className="timetable">

                {
                    ! notExists && <TimetableHeader />
                }

                {
                    fetched ?

                        <TimetableContent /> :

                        <TimetableLoader />
                }

            </section>
        );
    }

    componentDidMount() {

        this.updateTitle();
    }

    componentDidUpdate() {

        this.updateTitle();
    }

    updateTitle() {

        const urlParam = this.props.match.params.type;
        const { fetched, notExists, fetching } = this.props.timetableObject;

        if (notExists) {

            Timetable.setTitle(texts.title.notFound);
        } else if (fetching || fetched) {

            const timetableObjectType = urlTranslations[urlParam];
            const slug = this.getSlug();

            if (timetableObjectType === 'teacher') {

                const { teachers } = this.props;

                const currentTeacher = teachers.find(
                    teacher => teacher.slug === slug
                );

                Timetable.setTitle(currentTeacher.name || currentTeacher.slug);
            } else {

                Timetable.setTitle(slug);
            }
        }
    }

    static setTitle(title) {

        document.title = `${texts.title.base} | ${title}`;
    }

    getSlug() {

        return decodeURIComponent(this.props.match.params.slug);
    }
}

Timetable.propTypes = {

    // redux
    timetableObject: propTypes.shape({
        fetched: propTypes.bool.isRequired,
        fetching: propTypes.bool.isRequired,
        notExists: propTypes.bool.isRequired
    }).isRequired,

    teachers: propTypes.arrayOf(
        propTypes.shape({
            slug: propTypes.string.isRequired,
            name: propTypes.string
        }).isRequired
    ).isRequired,

    // router
    match: propTypes.shape({
        params: propTypes.shape({
            type: propTypes.string.isRequired,
            slug: propTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default withRouter(connect(mapStateToProps)(Timetable));