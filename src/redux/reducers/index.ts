import { combineReducers } from 'redux';
import {ViewReducer} from "./viewReducer/ViewReducer";
import {MenuReducer} from "./menuReducer/MenuReducer";
import {StudyReducer} from "./studyReducer/StudyReducer";

// @ts-ignore
const reducers = combineReducers([MenuReducer, ViewReducer, StudyReducer]);

export default reducers;