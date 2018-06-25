import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import propTypes from 'prop-types';

import detectIE10 from '../utils/detectIE10';
import LessonHour from './LessonHour';

import texts from '../../json/texts';

import '../../scss/table.scss';

function mapStateToProps(state) {

    const { timetableObject, hours } = state;

    return { timetableObject: timetableObject.data, hours };
}

class Table extends Component {

    constructor() {

        super();

        this.id = 0;
        this.tableCells = [];
    }

    render() {

        const numberOfLastHour = this.getNumberOfLastHour();

        return (
            <div className="table">
                <header className="table__header table__header--ordinal-numbers">
                    {texts.number}
                </header>

                {this.renderOridinalNumbers(numberOfLastHour)}

                <header className="table__header table__header--hours">
                    {texts.hour}
                </header>

                {this.renderHours(numberOfLastHour)}

                {this.renderDays(numberOfLastHour)}
            </div>
        );
    }

    componentDidMount() {

        this.applyPrefixes();
    }

    renderOridinalNumbers(number) {

        const cells = [];

        for (let i = 1; i <= number; i++) {

            cells.push(
                <div 
                    className="table__cell table__cell--ordinal-number" 
                    key={++this.id}
                    style={{ order: i + 1 }}
                    ref={(el) => { this.tableCells.push(el) }}
                >
                    {i}
                </div>
            );
        }

        return cells;    
    }

    renderHours(number) {

        const { hours } = this.props;
        const cells = [];

        for (let i = 0; i < number; i++) {

            const hour = hours[i];

            cells.push(
                <div 
                    className="table__cell table__cell--hour" 
                    key={hour._id}
                    style={{ order: i + 2 }}
                    data-number={i + 1}
                    ref={(el) => { this.tableCells.push(el) }}
                >
                    {hour.start} - {hour.end}
                </div>
            );
        }

        return cells;
    }

    renderDays(lastHour) {

        const { days } = texts;

        return days.map((day, index) => {

            return [
                <header
                    className={

                        classNames({
                            'table__header': true,
                            'table__header--mobile-hidden': !this.areLessonsInDay(index)
                        })
                    }

                    key={++this.id}
                >
                    {day}
                </header>,

                this.renderLessons(index, lastHour)
            ];
        });
    }

    renderLessons(dayNumber, lastHour) {

        const { timetable, type } = this.props.timetableObject;
        const day = timetable[dayNumber];

        let cells = [];

        if (day.length === 0) {

            this.pushEmptyCells(cells, lastHour);
        } else {

            cells = day.map((hour, index) => (
                <LessonHour
                    lessons={hour}
                    timetableObjectType={type}
                    order={index + 2}
                    number={index + 1}
                    key={++this.id}
                />
            ));

            this.pushEmptyCells(cells, lastHour);
        }

        return cells;
    }

    pushEmptyCells(cells, lastHour) {

        for (let i = cells.length; i < lastHour; i++) {

            cells.push(
                <LessonHour
                    mobileHidden
                    order={i + 2}
                    key={++this.id}
                />
            );
        }
    }

    getNumberOfLastHour() {

        const { timetable } = this.props.timetableObject;

        return timetable.reduce((prev, arr) => (prev > arr.length) ? prev : arr.length, 0);
    }

    areLessonsInDay(dayNumber) {

        const { timetable } = this.props.timetableObject;

        return timetable[dayNumber].some(
            lessonsArr => lessonsArr[0] && lessonsArr.length > 0
        );
    }

    applyPrefixes() {

        if (detectIE10()) {

            this.tableCells.forEach((cell) => {

                const { order } = cell.style;

                cell.style.msFlexOrder = order;
            });
        }
    }
}

Table.propTypes = {

    // redux
    hours: propTypes.arrayOf(propTypes.shape({
        start: propTypes.string.isRequired,
        end: propTypes.string.isRequired,
        _id: propTypes.string.isRequired
    })).isRequired,

    timetableObject: propTypes.shape({
        timetable: propTypes.arrayOf(
            propTypes.arrayOf(
                propTypes.arrayOf(
                    propTypes.shape({
                        _id: propTypes.string.isRequired,
                        subject: propTypes.string.isRequired,
                        class: propTypes.string,
                        classroom: propTypes.string,
                        teacherName: propTypes.string,
                        teacherSlug: propTypes.string
                    })
                )
            ).isRequired
        ).isRequired,

        type: propTypes.oneOf(['teacher', 'class', 'classroom']).isRequired
    }).isRequired,
};

export default connect(mapStateToProps)(Table);