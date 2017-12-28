import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import urlTranslations from '../../json/urlTranslations';

import '../../scss/timetableHeader.scss';

function mapStateToProps(state) {

    return {

        teachers: state.teachers    
    };
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

        const {type: urlParam} = this.props.match.params;

        const timetableObjectType = urlTranslations[urlParam];

        switch (timetableObjectType) {

            case 'teacher':
                return this.renderTeacherTitle();

            case 'class':
                return this.renderClassTitle();

            case 'classroom':
                return this.renderClassroomTitle();
        }
    }

    renderTeacherTitle() {

        const teacherSlug = this.getSlug();

        const teachers = this.props.teachers;

        const currentTeacher = teachers.find(teacher => teacher.slug === teacherSlug);

        return currentTeacher.name || currentTeacher.slug;
    }

    renderClassTitle() {

        const classSlug = this.getSlug();

        return classSlug;
    }

    renderClassroomTitle() {

        const classroomSlug = this.getSlug();

        return classroomSlug;
    }

    getSlug() {

        return decodeURIComponent(this.props.match.params.slug);
    }
}

export default withRouter(connect(mapStateToProps)(TimetableHeader));