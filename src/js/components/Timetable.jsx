import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

import TimetableLoader from './TimetableLoader';
import TimetableHeader from './TimetableHeader';
import TimetableContent from './TimetableContent';

import texts from '../../json/texts';
import urlTranslations from '../../json/urlTranslations';

import '../../scss/timetable.scss';

function mapStateToProps(state) {

    const {fetched, notExists, fetching} = state.timetableObject;

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

        const {fetched, notExists} = this.props.timetableObject;

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
        const {fetched, notExists, fetching} = this.props.timetableObject;

        if (notExists) {

            this.setTitle404();
        } else if (fetching || fetched) {

            const timetableObjectType = urlTranslations[urlParam];

            switch (timetableObjectType) {

                case 'teacher':
                    this.setTitleTeacher();

                    break;

                case 'class':
                    this.setTitleClass();

                    break;

                case 'classroom':
                    this.setTitleClassroom();

                    break;
            }
        }
    }

    setTitle404() {

        const {title} = texts;

        document.title = `${title.base} | ${title.notFound}`;
    }

    setTitleTeacher() {

        const {title} = texts;
        const teacherSlug = this.getSlug();
        const teachers = this.props.teachers;
        const currentTeacher = teachers.find(teacher => teacher.slug === teacherSlug);

        document.title = `${title.base} | ${currentTeacher.name || currentTeacher.slug}`;
    }

    setTitleClass() {

        const {title, schoolClass} = texts;
        const classSlug = this.getSlug();

        document.title = `${title.base} | ${classSlug}`;
    }

    setTitleClassroom() {

        const {title, classroom} = texts;
        const classroomSlug = this.getSlug();

        document.title = `${title.base} | ${classroomSlug}`;
    }

    getSlug() {

        return decodeURIComponent(this.props.match.params.slug);
    }
}

export default withRouter(connect(mapStateToProps)(Timetable));