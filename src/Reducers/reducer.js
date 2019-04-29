import {combineReducers} from 'redux';
import accountReducer from './accountReducer';
import projectReducer from './projectReducer';
import personalProjectReducer from './personalProjectReducer';

const reducer = combineReducers({
    account: accountReducer,
    project: projectReducer,
    personalProject: personalProjectReducer
})
export default reducer