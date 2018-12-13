import {
    REQUESTED,
    SUCCEEDED,
    FAILED,
    NOT_FOUND,
    PUT_LAST_UPDATE_DATE
} from '../constants/timetableObject';

const initialState = {
    fetched: false,
    fetching: false,
    fetchingError: false,
    notExists: false,
    data: null,
    lastUpdateDate: null
};

export default function timetableObjectReducer(state = initialState, action) {

    const { payload } = action;

    switch (action.type) {

        case REQUESTED:
            return {
                ...state,
                fetched: false,
                fetchingError: false,
                notExists: false,
                fetching: true
            };

        case SUCCEEDED:
            return {
                ...state,
                fetched: true,
                fetching: false,
                fetchingError: false,
                data: payload
            };

        case FAILED:
            return {
                ...state,
                fetched: false,
                fetching: false,
                fetchingError: true
            };

        case NOT_FOUND:
            return {
                ...state,
                fetched: false,
                fetching: false,
                fetchingError: false,
                notExists: true
            };

        case PUT_LAST_UPDATE_DATE:
            return {
                ...state,
                lastUpdateDate: payload
            };

        default:
            return state;
    }
}