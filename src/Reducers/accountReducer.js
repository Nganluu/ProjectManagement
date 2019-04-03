import {USER_SIGNUP, USER_LOGIN} from '../Actions/types';


const iniState = {
    id: "",
    name: "",
    email: "",
    password: "",
    signupSucess: "",
    loginSuccess: ""
}
export default function accountReducer(state= iniState, action){
    switch(action.type){
        case USER_SIGNUP: 
        console.log("REGISTER_SUCCESS")
        console.log(action.payload.success)
            return {
                ...state,
               signupSuccess: action.payload.success
            }
        case USER_LOGIN: 
        console.log("LOGIN_SUCCESS")
        console.log(action.payload.succes)
        return {
            ...state, 
            id: action.payload.id,
            loginSuccess: action.payload.succes
        }
            default: return state;    
    }
}