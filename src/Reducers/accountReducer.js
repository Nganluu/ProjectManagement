import {USER_SIGNUP, USER_LOGIN, UPDATE_PASSWORD, UPDATE_NAME, LOGIN_ERROR, UPDATE_PASSWORD_ERROR, API_CALLING} from '../Actions/types';


const iniState = {
    id: "",
    name: "",
    email: "",
    password: "",
    token: "",
    loginErr: "",
    signupSuccess: "",
    loginSuccess: "",
    changePassErr: "",
    changePassSuccess: "",
    signupMessage: "",
    error: "",
    callapidone: false
}
export default function accountReducer(state= iniState, action){
    switch(action.type){
        case API_CALLING: 
            return{
                ...state,
                callapidone: false
            }
        case USER_SIGNUP: 
            if(action.payload.success) {console.log("REGISTER_SUCCESS")}
            else {console.log("REGISTER_FAILURE")}
                return {
                    ...state,
                signupSuccess: action.payload.success,
                signupMessage: action.payload.message,
                callapidone: true
            }
        case USER_LOGIN: 
            if(action.payload.success) {
               
                console.log("LOGIN_SUCCESS")
            }else {
                console.log("LOGIN_FAILURE");
            };
            return {
                ...state, 
                token: action.payload.token,
                email: action.payload.email,
                name: action.payload.name,
                id: action.payload.id,
                error: action.error,
                callapidone: true,
                loginSuccess: action.payload.success
            }
           
        case LOGIN_ERROR: 
            return{
                ...state,
                error: action.error,
                callapidone: true
            }
        case UPDATE_PASSWORD: 
                if(action.payload.success) {console.log("PASSWORD_UPDATED")}
                else {console.log("PASSWORD_UPDATE_FAILURE")}
            return {
                ...state,
                changePassSuccess: action.payload.success,
                callapidone: true
            }
        case UPDATE_PASSWORD_ERROR: 
            return{
                ...state,
                changePassSuccess: false,
                changePassErr: action.error,
                callapidone: true
            }
        case UPDATE_NAME: 
                if(action.payload.success) {console.log("NAME_UPDATED")}
            else {console.log("NAME_UPDATE_FAILURE")}
            return {
                ...state, 
                name: action.payload.data.name,
                callapidone: true
            }
            default: return state;    
    }
}