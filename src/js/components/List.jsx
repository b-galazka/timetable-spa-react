import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import propTypes from 'prop-types';

import urlsTranslations from '../../json/urlTranslations';

function mapStateToProps(state) {

    const { teachers, classes, classrooms } = state;

    return { teachers, classes, classrooms };
}

class List extends Component {

    render() {

        return (
            <ul className="sidebar__list">
                {this.renderItems()}
            </ul>
        );
    }

    renderItems() {

        const { type, onLinkClicked } = this.props;
        const data = this.getListData(type);
        const urlSlug = decodeURIComponent(this.props.match.params.slug);
        const urlType = decodeURIComponent(this.props.match.params.type);
        const isActiveType = (urlsTranslations[urlType] === type);

        return data.map(({ slug, name, number, _id }) => {

            let url = `/${urlsTranslations[type]}`;
                url += `/${encodeURIComponent(slug || number)}`;

            const link = (
                <Link onClick={onLinkClicked} to={url}>
                    {name || slug || number}
                </Link>
            );

            return (
                (isActiveType && (urlSlug === slug || urlSlug === number)) ?

                    <li key={_id} className="active">{link}</li> :

                    <li key={_id}>{link}</li>
            );
        });
    }

    getListData(type) {

        const { teachers, classes, classrooms } = this.props;

        switch (type) {

            case 'teacher':
                return teachers;

            case 'class':
                return classes;

            case 'classroom':
                return classrooms;

            default:
                return [];
        }
    }
}

List.propTypes = {
    
    onLinkClicked: propTypes.func.isRequired,
    type: propTypes.oneOf(['teacher', 'class', 'classroom']).isRequired,

    // router
    match: propTypes.shape({
        params: propTypes.shape({
            slug: propTypes.string.isRequired,
            type: propTypes.string.isRequired
        }).isRequired
    }).isRequired,

    // redux
    teachers: propTypes.arrayOf(propTypes.shape({
        slug: propTypes.string.isRequired,
        _id: propTypes.string.isRequired,
        name: propTypes.string
    })).isRequired,

    classrooms: propTypes.arrayOf(propTypes.shape({
        number: propTypes.string.isRequired,
        _id: propTypes.string.isRequired
    })).isRequired,

    classes: propTypes.arrayOf(propTypes.shape({
        slug: propTypes.string.isRequired,
        _id: propTypes.string.isRequired
    })).isRequired
};

export default withRouter(connect(mapStateToProps)(List));