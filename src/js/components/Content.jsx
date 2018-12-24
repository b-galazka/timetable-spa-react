import React, { Component } from 'react';
import classNames from 'classnames';

import Sidebar from './Sidebar';
import Timetable from './Timetable';

import '../../scss/content.scss';
import '../../scss/animations.scss';

export default class Content extends Component {

    constructor() {

        super();

        this.state = {
            animationClass: true
        };

        this.removeAnimationClass = this.removeAnimationClass.bind(this);
    }

    render() {

        return (
            <div
                className={

                    classNames({
                        app__wrapper: true,
                        animated: this.state.animationClass
                    })
                }

                onAnimationEnd={this.removeAnimationClass}
            >
                <Sidebar />
                <Timetable />
            </div>
        );
    }

    removeAnimationClass() {

        this.setState({
            animationClass: false
        });
    }
}