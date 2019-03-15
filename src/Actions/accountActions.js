import axios from 'axios';
import {USER_SIGNUP} from './types'

export const userSignup = (username, email, password)=>dispatch=>{
    axios.post('',{
        username: username,
        email: email,
        password: password
    }).then(
        res=>dispatch({
            type: USER_SIGNUP,
            payload: res.data
        })
    )
}