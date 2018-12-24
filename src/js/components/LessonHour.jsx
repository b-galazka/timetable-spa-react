import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import PropTypes from 'prop-types';

import detectIE10 from '../utils/detectIE10';

class LessonHour extends Component {

    render() {

        const { mobileHidden, order, number } = this.props;
        const hasLessons = this.hasLessons();

        return (
            <article
                className={

                    classNames({
                        table__cell: true,
                        'table__cell--empty': (! hasLessons && ! mobileHidden),
                        'table__cell--mobile-hidden': mobileHidden
                    })
                }

                style={{ order }}
                data-number={number}
                ref={(el) => { this.tableCell = el; }}
            >
                {hasLessons && this.renderLessons()}
            </article>
        );
    }

    componentDidMount() {

        this.applyPrefix();
    }

    renderLessons() {

        const { lessons } = this.props;

        return lessons.map((lesson) => {

            if (! lesson) {

                return null;
            }

            const { _id, subject } = lesson;

            return (
                <div key={_id}>
                    <span>{subject}</span>
                    {this.renderSecondInfo(lesson)}
                    {this.renderThirdInfo(lesson)}
                </div>
            );
        });
    }

    renderSecondInfo(lesson) {

        const { timetableObjectType } = this.props;
        const { teacherSlug, class: schoolClass, teacherName } = lesson;

        switch (timetableObjectType) {

            case 'teacher':
                return <Link to={`/klasa/${encodeURIComponent(schoolClass)}`}>{schoolClass}</Link>;

            case 'class':
            case 'classroom':
                return (
                    <Link
                        to={`/nauczyciel/${encodeURIComponent(teacherSlug)}`}
                        title={teacherName}
                    >
                        {teacherSlug}
                    </Link>
                );

            default:
                return null;
        }
    }

    renderThirdInfo(lesson) {

        const { timetableObjectType } = this.props;
        const { classroom, class: schoolClass } = lesson;

        switch (timetableObjectType) {

            case 'classroom':
                return <Link to={`/klasa/${encodeURIComponent(schoolClass)}`}>{schoolClass}</Link>;

            case 'class':
            case 'teacher':
                return <Link to={`/sala/${encodeURIComponent(classroom)}`}>{classroom}</Link>;

            default:
                return null;
        }
    }

    hasLessons() {

        const { lessons } = this.props;

        return Array.isArray(lessons) && Boolean(lessons[0]);
    }

    applyPrefix() {

        if (detectIE10()) {

            const { style } = this.tableCell;

            style.msFlexOrder = style.order;
        }
    }
}

LessonHour.propTypes = {
    lessons: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        subject: PropTypes.string.isRequired,
        class: PropTypes.string,
        classroom: PropTypes.string,
        teacherName: PropTypes.string,
        teacherSlug: PropTypes.string
    })),

    timetableObjectType: PropTypes.oneOf(['teacher', 'class', 'classroom']),
    mobileHidden: PropTypes.bool,
    order: PropTypes.number.isRequired,
    number: PropTypes.number
};

LessonHour.defaultProps = {
    lessons: null,
    timetableObjectType: null,
    mobileHidden: false,
    number: 0
};

export default LessonHour;