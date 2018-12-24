import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';
import propTypes from 'prop-types';

import List from './List';

import urlTranslations from '../../json/urlTranslations';
import buttonsTexts from '../../json/buttonsTexts';

import '../../scss/sidebar.scss';

class Sidebar extends Component {

    constructor(props) {

        super();

        const { type: urlParam } = props.match.params;

        this.state = {
            visibleList: urlTranslations[urlParam],
            isMobileOpened: false
        };

        this.listButtonHandler = this.listButtonHandler.bind(this);
        this.toggleOnMobile = this.toggleOnMobile.bind(this);
        this.closeOnMobile = this.closeOnMobile.bind(this);
    }

    render() {

        const { visibleList, isMobileOpened } = this.state;

        return (
            <section
                className={

                    classNames({
                        sidebar: true,
                        'sidebar--mobile-opened': isMobileOpened
                    })
                }
            >
                <div className="sidebar__wrapper">
                    <div className="sidebar__buttons">
                        {this.renderButtons()}
                    </div>

                    <List onLinkClicked={this.closeOnMobile} type={visibleList} />
                </div>

                <button
                    className={

                        classNames({
                            'sidebar__mobile-trigger': true,
                            'sidebar__mobile-trigger--sidebar-opened': isMobileOpened
                        })
                    }

                    onClick={this.toggleOnMobile}
                >
                    <span></span>
                </button>
            </section>
        );
    }

    renderButtons() {

        return Object.keys(buttonsTexts).map((key, index) => {

            const buttonText = buttonsTexts[key];

            return (
                <button
                    type="button"
                    onClick={this.listButtonHandler(key)}
                    key={index}
                    className={

                        classNames({
                            sidebar__button: true,
                            'sidebar__button--active': (key === this.state.visibleList)
                        })
                    }
                >
                    {buttonText}
                </button>
            );
        });
    }

    listButtonHandler(listName) {

        return () => {

            this.setState({
                visibleList: listName
            });
        };
    }

    toggleOnMobile() {

        const { isMobileOpened } = this.state;

        this.setState({
            isMobileOpened: !isMobileOpened
        });
    }

    closeOnMobile() {

        this.setState({ isMobileOpened: false });
    }
}

Sidebar.propTypes = {
    // router
    match: propTypes.shape({
        params: propTypes.shape({
            type: propTypes.string.isRequired
        }).isRequired
    }).isRequired
};

export default withRouter(Sidebar);