import {
    PUT_CLASSES_LIST,
    PUT_CLASSROOMS_LIST,
    PUT_HOURS_LIST,
    PUT_TEACHERS_LIST
} from '../constants/lists';

function getValidConstant(listType) {

    switch (listType) {

        case 'teachers':
            return PUT_TEACHERS_LIST;

        case 'classes':
            return PUT_CLASSES_LIST;

        case 'classrooms':
            return PUT_CLASSROOMS_LIST;

        case 'hours':
            return PUT_HOURS_LIST;
    }
}

export function putObjectsList(payload, listType) {

    return {
        type: getValidConstant(listType),
        payload
    };
}