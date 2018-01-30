import {REQUESTED, SUCCEEDED, FAILED} from '../constants/mobileAppData';

const initialState = {
    fetched: false,
    fetching: false,
    fetchingError: false,
    data: null
};

export default function mobileAppDataReducer(state = initialState, action) {

    const {payload} = action;

    switch (action.type) {

        case REQUESTED:
            return {
                ...state,
                fetched: false,
                fetchingError: false,
                fetching: true
            };

        case SUCCEEDED:

            return {
                ...state,
                fetched: true,
                fetching: false,
                fetchingError: false,
                data: {
                    apkFileUrl: payload.apkFileUrl
                }
            };
            
        case FAILED:
            return {
                ...state,
                fetched: false,
                fetching: false,
                fetchingError: true
            };

        default:
            return state;
    }
}