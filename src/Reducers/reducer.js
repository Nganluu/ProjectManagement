import {combineReducers} from 'redux';
import accountReducer from './accountReducer';
import projectReducer from './projectReducer';
import personalProjectReducer from './personalProjectReducer';
import jobGroupReducer from './jobGroupReducer'

const reducer = combineReducers({
    account: accountReducer,
    project: projectReducer,
    personalProject: personalProjectReducer,
    jobGroup: jobGroupReducer
})
export default reducer