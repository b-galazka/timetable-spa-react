import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

import errors from '../../json/errors';
import texts from '../../json/texts';

class NotFound extends Component {

    render() {

        return (
            <section className="app__no-content">
                <div>
                    <p>{errors.notFound}</p>
                </div>
            </section>
        );
    }

    componentDidMount() {

        this.updateTitle();
    }

    updateTitle() {

        const {title} = texts;

        const {pathname} = this.props.location;

        if (pathname !== '/') {

            document.title = `${title.base} | ${title.notFound}`;
        }    
    }
}

export default withRouter(NotFound);