import {combineReducers} from 'redux';
import accountReducer from './accountReducer';
import projectReducer from './projectReducer';
import personalProjectReducer from './personalProjectReducer';
import jobGroupReducer from './jobGroupReducer';
import jobReducer from './jobReducer';
import taskReducer from './taskReducer';
import memberJobReducer from './memberJobReducer';
import commentReducer from './commentReducer';

const reducer = combineReducers({
    account: accountReducer,
    project: projectReducer,
    personalProject: personalProjectReducer,
    jobGroup: jobGroupReducer,
    job: jobReducer,
    task: taskReducer,
    memberJob: memberJobReducer,
    comment: commentReducer

})
export default reducer