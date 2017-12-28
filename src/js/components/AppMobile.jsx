import React, {Component} from 'react';

import texts from '../../json/texts.json';
import urls from '../../json/urls.json';

import '../../scss/mobileApp.scss';

export default class AppMobile extends Component {

    constructor() {

        super();

        this.visitPage = this.visitPage.bind(this);
    }

    render() {

        return (
            <main className="mobile-app">
                <a
                    className="mobile-app__button"
                    href={urls.mobileAppDownload}
                    target="_blank"
                >
                    {texts.downloadApp}
                </a>
                
                <button
                    className="mobile-app__button"
                    onClick={this.visitPage}
                >
                    {texts.visitPage}
                </button>
            </main>
        );
    }

    visitPage() {

        this.props.visitPage();
    }
}