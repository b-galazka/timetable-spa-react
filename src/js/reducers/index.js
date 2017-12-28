import {combineReducers} from 'redux';

import classes from './classesList';
import teachers from './teachersList';
import classrooms from './classroomsList';
import timetableObject from './timetableObject';
import hours from './hoursList';
import initialState from './initialState';

export default combineReducers({
    classes,
    classrooms,
    teachers,
    timetableObject,
    hours,
    initialState
});