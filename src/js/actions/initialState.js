import {REQUESTED, FAILED, SUCCEEDED} from '../constants/initialState';

export function getInitialState({objectType, slug}) {

    return {
        type: REQUESTED,
        objectType,
        slug
    };
}

export function fetchingInitialStateSuccess() {

    return {
        type: SUCCEEDED
    };
}

export function fetchingInitialStateFailure() {

    return {
        type: FAILED
    };
}