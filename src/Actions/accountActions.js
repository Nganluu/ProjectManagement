import axios from 'axios';
import {USER_SIGNUP, USER_LOGIN} from './types'

export const userSignup = (name, email, password)=>dispatch=>{
    axios.post('http://localhost:8000/api/register/',{
        name: name,
        email: email,
        password: password
    }).then(
        res=>dispatch(
        {
            type: USER_SIGNUP,
            payload: res.data,
        }),
    ).catch(function (error) {
        console.log(error.response);
      });
    
}
export const userLogin = (email, password) => dispatch => {
    axios.post("http://localhost:8000/api/login", {
        email: email,
        password: password
    }).then(
        res => dispatch({
            type: USER_LOGIN,
            payload: res.data
        })
    ).catch(function (error) {
        console.log(error.response);
      });
}