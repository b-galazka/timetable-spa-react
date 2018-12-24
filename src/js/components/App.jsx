import React, { Component } from 'react';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

import AppContainer from './AppContainer';
import NotFound from './NotFound';
import AppMobile from './AppMobile';
import detectAndroidDevice from '../utils/detectAndroidDevice';

import urlTranslations from '../../json/urlTranslations';
import urls from '../../json/urls.json';

import '../../scss/main.scss';

export default class App extends Component {

    constructor() {

        super();

        this.state = {
            android: detectAndroidDevice()
        };

        this.visitPage = this.visitPage.bind(this);
    }

    render() {

        return (
            <BrowserRouter>

                {
                    (this.state.android) ?

                        <AppMobile visitPage={this.visitPage} /> :

                        <main className="app">
                            <Switch>
                                <Redirect exact from="/" to={urls.defaultRedirection} />
                                <Route exact path='/:type/:slug' render={App.isUrlValid} />
                                <Route component={NotFound} />
                            </Switch>
                        </main>
                }

            </BrowserRouter>
        );
    }

    static isUrlValid({ match }) {

        const { type } = match.params;
        const possibleTypes = urlTranslations.types;

        if (possibleTypes.includes(type)) {

            return <AppContainer />;
        }

        return <NotFound />;
    }

    visitPage() {

        this.setState({
            android: false
        });
    }
}