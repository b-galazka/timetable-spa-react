import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import classNames from 'classnames';

import List from './List';

import urlTranslations from '../../json/urlTranslations';
import buttonsTexts from '../../json/buttonsTexts';

import '../../scss/sidebar.scss';

class Sidebar extends Component {

    constructor(props) {

        super();

        const {type: urlParam} = props.match.params;

        this.state = {
            visibleList: urlTranslations[urlParam]
        };

        this.buttonHandler = this.buttonHandler.bind(this);
    }

    render() {

        return (
            <section className="sidebar">
                <div className="sidebar__wrapper">
                    <div className="sidebar__buttons">
                        {this.renderButtons()}
                    </div>

                    <List type={this.state.visibleList} />
                </div>
            </section>
        );
    }

    renderButtons() {

        return Object.keys(buttonsTexts).map((key, index) => {

            const buttonText = buttonsTexts[key];

            return (
                <button 
                    type="button" 
                    onClick={this.buttonHandler(key)}
                    key={index}
                    className={
                        
                        classNames({
                            'sidebar__button': true,
                            'sidebar__button--active': (key === this.state.visibleList)
                        })
                    }
                >
                    {buttonText}
                </button>
            );
        });
    }

    buttonHandler(listName) {

        return () => {

            this.setState({
                visibleList: listName
            });
        };
    }
}

export default withRouter(Sidebar);