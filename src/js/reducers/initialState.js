import {REQUESTED, SUCCEEDED, FAILED} from '../constants/initialState';

const initialState = {
    fetched: false,
    fetching: false,
    fetchingError: false
};

export default function classesListReducer(state = initialState, action) {

    switch (action.type) {

        case REQUESTED:
            return {
                ...state,
                fetching: true,
            };

        case SUCCEEDED:
            return {
                ...state,
                fetching: false,
                fetched: true
            };

        case FAILED: 
            return {
                ...state,
                fetching: false,
                fetched: false,
                fetchingError: true
            };

        default:
            return state;
    }
}