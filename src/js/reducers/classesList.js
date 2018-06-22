import { PUT_CLASSES_LIST } from '../constants/lists';

export default function classesListReducer(state = [], action) {

    switch (action.type) {

        case PUT_CLASSES_LIST:
            return action.payload;

        default:
            return state;
    }
}