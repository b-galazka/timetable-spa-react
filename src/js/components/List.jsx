import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';

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

        const type = this.props.type;

        switch (type) {

            case 'teacher':
                return this.renderTeachers();

            case 'class':
                return this.renderClasses();

            case 'classroom':
                return this.renderClassrooms();
        }
    }

    renderTeachers() {

        const teachers = this.props.teachers;

        const teacherUrlParam = decodeURIComponent(this.props.match.params.slug);

        return teachers.map((teacher) => {

            const url = `/nauczyciel/${encodeURIComponent(teacher.slug)}`;

            const link = (
                <Link to={url}>
                    {teacher.name || teacher.slug}
                </Link>
            );

            return (
                teacherUrlParam === teacher.slug ?

                <li key={teacher._id} className="active">{link}</li> :

                <li key={teacher._id}>{link}</li>
            );    
        });
    }

    renderClasses() {

        const classes = this.props.classes;

        const classUrlParam = decodeURIComponent(this.props.match.params.slug);

        return classes.map((schoolClass) => {

            const url = `/klasa/${encodeURIComponent(schoolClass.slug)}`;

            const link = (
                <Link to={url}>
                    {schoolClass.slug}
                </Link>
            );

            return (
                classUrlParam === schoolClass.slug ?

                <li key={schoolClass._id} className="active">{link}</li> :

                <li key={schoolClass._id}>{link}</li>
            );
        });
    }

    renderClassrooms() {

        const classrooms = this.props.classrooms;

        const classroomUrlParam = decodeURIComponent(this.props.match.params.slug);

        return classrooms.map((classroom) => {

            const url = `/sala/${encodeURIComponent(classroom.number)}`;

            const link = (
                <Link to={url}>
                    {classroom.number}
                </Link>
            );

            return (
                classroomUrlParam === classroom.number ?

                <li key={classroom._id} className="active">{link}</li> :

                <li key={classroom._id}>{link}</li>
            );
        });
    }
}

export default withRouter(connect(mapStateToProps)(List));