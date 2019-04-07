import {USER_SIGNUP, USER_LOGIN, UPDATE_PASSWORD, UPDATE_NAME, LOGIN_ERROR} from '../Actions/types';


const iniState = {
    id: "",
    name: "",
    email: "",
    password: "",
    token: "",
    signupSucess: "",
    signupMessage: "",
    loginSuccess: "",
    error: ""
    
}
export default function accountReducer(state= iniState, action){
    switch(action.type){
        case USER_SIGNUP: 
            if(action.payload.success) {console.log("REGISTER_SUCCESS")}
            else {console.log("REGISTER_FAILURE")}
                return {
                    ...state,
                signupSuccess: action.payload.success,
                signupMessage: action.payload.message
            }
        case USER_LOGIN: 
            if(action.payload.success) {console.log("LOGIN_SUCCESS")}
            else {console.log("LOGIN_FAILURE")}
            return {
                ...state, 
                token: action.payload.token,
                email: action.payload.email,
                name: action.payload.name,
                id: action.payload.id,
                loginSuccess: action.payload.success,
            }
        case LOGIN_ERROR: 
            return{
                ...state,
                error: action.error
            }
            case UPDATE_PASSWORD: 
                if(action.payload.success) {console.log("PASSWORD_UPDATED")}
                else {console.log("PASSWORD_UPDATE_FAILURE")}
            return {
                ...state,
            }
        case UPDATE_NAME: 
                if(action.payload.success) {console.log("NAME_UPDATED")}
            else {console.log("NAME_UPDATE_FAILURE")}
            return {
                ...state, 
                name: action.payload.name
            }
            default: return state;    
    }
}