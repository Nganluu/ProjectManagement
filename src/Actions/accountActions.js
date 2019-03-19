import axios from 'axios';
import {USER_SIGNUP, ADD_NEW_PROJECT} from './types'

export const userSignup = (username, email, password)=>dispatch=>{
    axios.post('',{
        user_name: username,
        user_mail: email,
        user_pass: password
    }).then(
        res=>dispatch({
            type: USER_SIGNUP,
            payload: res.data
        })
    )
}
