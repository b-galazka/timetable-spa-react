import { PUT_TEACHERS_LIST } from '../constants/lists';

export default function teachersListReducer(state = [], action) {

    switch (action.type) {

        case PUT_TEACHERS_LIST:
            return action.payload;

        default:
            return state;
    }
}