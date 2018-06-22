import React, { createElement } from 'react';

const reactRouterDom = require('react-router-dom');

reactRouterDom.BrowserRouter = ({ children }) => (
    <div data-mock="BrowserRouter">{children}</div>
);

reactRouterDom.Route = ({ component, render, computedMatch }) => (

    component ?

        createElement(component) :

        render({
            match: { params: computedMatch.params }
        })
);

reactRouterDom.Redirect = ({ from, to }) => (
    <div data-mock="Redirect" data-from={from} data-to={to}></div>
);

module.exports = reactRouterDom;