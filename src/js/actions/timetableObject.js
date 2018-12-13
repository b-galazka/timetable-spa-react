import {
    REQUESTED,
    SUCCEEDED,
    FAILED,
    NOT_FOUND,
    PUT_LAST_UPDATE_DATE
} from '../constants/timetableObject';

export function getTimetableObject({ objectType, slug }) {

    return {
        type: REQUESTED,
        objectType,
        slug
    };
}

export function fetchingTimetableObjectSuccess(payload) {

    return {
        type: SUCCEEDED,
        payload
    };
};

export function fetchingTimetableObjectFailure() {

    return {
        type: FAILED
    };
}

export function timetableObjectNotFound() {

    return {
        type: NOT_FOUND
    };
}

export function putLastUpdateDate(payload) {

    return {
        type: PUT_LAST_UPDATE_DATE,
        payload
    };
}