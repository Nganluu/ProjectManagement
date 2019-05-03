import {combineReducers} from 'redux';
import accountReducer from './accountReducer';
import projectReducer from './projectReducer';
import personalProjectReducer from './personalProjectReducer';
import jobGroupReducer from './jobGroupReducer';
import jobReducer from './jobReducer';

const reducer = combineReducers({
    account: accountReducer,
    project: projectReducer,
    personalProject: personalProjectReducer,
    jobGroup: jobGroupReducer,
    job: jobReducer

})
export default reducer