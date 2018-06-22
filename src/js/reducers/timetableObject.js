import { REQUESTED, SUCCEEDED, FAILED, NOT_FOUND } from '../constants/timetableObject';

const initialState = {
    fetched: false,
    fetching: false,
    fetchingError: false,
    notExists: false,
    data: null
};

export default function timetableObjectReducer(state = initialState, action) {

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
                data: action.payload
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

        default:
            return state;
    }
}