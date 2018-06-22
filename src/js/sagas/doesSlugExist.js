import { select } from 'redux-saga/effects';

export default function *doesSlugExist({ slug, objectType }) {

    const { classes, classrooms, teachers } = yield select();

    const doesContainSlug = item => item.slug === slug || item.number === slug;

    switch (objectType) {

        case 'teacher':
            return teachers.some(doesContainSlug);

        case 'class':
            return classes.some(doesContainSlug);

        case 'classroom':
            return classrooms.some(doesContainSlug);

        default:
            return false;
    }
}