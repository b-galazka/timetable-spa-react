import { PUT_HOURS_LIST } from '../constants/lists';

export default function hoursListReducer(state = [], action) {

    switch (action.type) {

        case PUT_HOURS_LIST:
            return action.payload;

        default:
            return state;
    }
}