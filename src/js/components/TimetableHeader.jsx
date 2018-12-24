import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import propTypes from 'prop-types';

import urlTranslations from '../../json/urlTranslations';

import '../../scss/timetableHeader.scss';

function mapStateToProps(state) {

    const { teachers } = state;

    return { teachers };
}

class TimetableHeader extends Component {

    render() {

        return (
            <header className="timetable__header">
                <h1 className="timetable__title">
                    {this.renderTitle()}
                </h1>
            </header>
        );
    }

    renderTitle() {

        const { type: urlParam } = this.props.match.params;
        const timetableObjectType = urlTranslations[urlParam];

        if (timetableObjectType === 'teacher') {

            return this.renderTeacherTitle();
        }

        return this.getSlug();
    }

    renderTeacherTitle() {

        const teacherSlug = this.getSlug();
        const { teachers } = this.props;
        const currentTeacher = teachers.find(teacher => teacher.slug === teacherSlug);

        return currentTeacher.name || currentTeacher.slug;
    }

    getSlug() {

        return decodeURIComponent(this.props.match.params.slug);
    }
}

TimetableHeader.propTypes = {

    // router
    match: propTypes.shape({
        params: propTypes.shape({
            slug: propTypes.string.isRequired,
            type: propTypes.string.isRequired
        }).isRequired
    }).isRequired,

    // redux
    teachers: propTypes.arrayOf(
        propTypes.shape({
            slug: propTypes.string.isRequired,
            name: propTypes.string
        }).isRequired
    ).isRequired
};

export default withRouter(connect(mapStateToProps)(TimetableHeader));