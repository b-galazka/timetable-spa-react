import { PUT_CLASSROOMS_LIST } from '../constants/lists';

export default function classroomsListReducer(state = [], action) {

    switch (action.type) {

        case PUT_CLASSROOMS_LIST:
            return action.payload;

        default:
            return state;
    }
}