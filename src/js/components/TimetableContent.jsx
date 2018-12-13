import React, { Component } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Table from './Table';

import texts from '../../json/texts';

import '../../scss/timetableContent.scss';
import '../../scss/animations.scss';

function mapStateToProps(state) {

    const { timetableObject } = state;

    return {
        lastModified: timetableObject.lastUpdateDate
    };
}

class TimetableContent extends Component {

    constructor() {

        super();

        this.state = {
            animationClass: true
        };

        this.removeAnimationClass = this.removeAnimationClass.bind(this);
    }

    render() {

        return (
            <section className="timetable__wrapper"
                className={

                    classNames({
                        'timetable__wrapper': true,
                        animated: this.state.animationClass
                    })
                }

                onAnimationEnd={this.removeAnimationClass}
            >
                <div className="timetable__content">
                    <Table />
                </div>

                <footer className="timetable__footer">
                    <p>{texts.lastModified}: {this.convertDate()}</p>
                </footer>
            </section>
        );
    }

    convertDate() {

        const date = new Date(this.props.lastModified);

        const year = date.getFullYear();
        const day = this.formatTimeUnit(date.getDate());
        const month = this.formatTimeUnit(date.getMonth() + 1);
        const hour = this.formatTimeUnit(date.getHours());
        const minutes = this.formatTimeUnit(date.getMinutes());

        return `${day}/${month}/${year} ${hour}:${minutes}`;
    }

    formatTimeUnit(unit) {

        return (unit < 10) ? `0${unit}` : unit;
    }

    removeAnimationClass() {

        this.setState({
            animationClass: false
        });
    }
}

TimetableContent.propTypes = {

    // redux
    lastModified(props, propName) {

        const propValue = props[propName];

        if (new Date(propValue).toString() === 'Invalid Date') {

            return new Error('props.lastModified validation error');
        }
    }
};

export default connect(mapStateToProps)(TimetableContent);