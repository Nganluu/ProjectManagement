import {combineReducers} from 'redux'
import accountReducer from './accountReducer'
import projectReducer from './projectReducer';

const reducer = combineReducers({
    account: accountReducer,
    project: projectReducer
})
export default reducer