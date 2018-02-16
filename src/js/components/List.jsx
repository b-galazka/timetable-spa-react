import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';

import urlsTranslations from '../../json/urlTranslations';

function mapStateToProps(state) {

    return {
        teachers: state.teachers,
        classes: state.classes,
        classrooms: state.classrooms
    };
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

        const {type} = this.props;
        const data = this.getListData(type);
        const urlSlug = decodeURIComponent(this.props.match.params.slug);

        return data.map(({slug, name, number, _id}) => {

            let url = `/${urlsTranslations[type]}`;
                url += `/${encodeURIComponent(slug || number)}`;

            const link = <Link to={url}>{name || slug || number}</Link>;

            return (
                urlSlug === slug ?

                    <li key={_id} className="active">{link}</li> :

                    <li key={_id}>{link}</li>
            );
        });
    }

    getListData(type) {

        const {teachers, classes, classrooms} = this.props;

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

export default withRouter(connect(mapStateToProps)(List));