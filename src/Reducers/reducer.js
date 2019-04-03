import {combineReducers} from 'redux'
import accountReducer from './accountReducer'

const reducer = combineReducers({
    account: accountReducer
})
export default reducer