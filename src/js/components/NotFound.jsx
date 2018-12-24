import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import propTypes from 'prop-types';

import errors from '../../json/errors';
import texts from '../../json/texts';

class NotFound extends Component {

    render() {

        return (
            <section className="app__no-content">
                <div>
                    <p>{errors.notFound}</p>

                    <Link
                        to="/"
                        className="button button--404"
                    >
                        {texts.goHomepage}
                    </Link>
                </div>
            </section>
        );
    }

    componentDidMount() {

        this.updateTitle();
    }

    updateTitle() {

        const { title } = texts;
        const { pathname } = this.props.location;

        if (pathname !== '/') {

            document.title = `${title.base} | ${title.notFound}`;
        }
    }
}

NotFound.propTypes = {
    // router
    location: propTypes.shape({ pathname: propTypes.string.isRequired }).isRequired
};

export default withRouter(NotFound);