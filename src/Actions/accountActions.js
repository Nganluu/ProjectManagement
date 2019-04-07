import axios from 'axios';
import { USER_SIGNUP, USER_LOGIN, UPDATE_PASSWORD, UPDATE_NAME, LOGIN_ERROR } from './types'

export const userSignup = (name, email, password) => dispatch => {
    axios.post('http://localhost:8000/api/register/', {
        name: name,
        email: email,
        password: password
    },
        console.log("REGISTER_FETCHING")
    ).then(
        res => dispatch(
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
    },
        console.log("LOGIN_FETCHING")
    ).then(
        res => dispatch({
            type: USER_LOGIN,
            payload: res.data
        })
    ).catch(function (error) {
        dispatch({type: LOGIN_ERROR, error: error.response.status})
    });
}
export const updatePassword = (password, newpassword)=>dispatch=>{
    axios.put("http://localhost:8000/api/updatepassword/"+localStorage.getItem("userId"), {
            password: password,
            new_password: newpassword
    }, console.log("PASSWORD_UPDATING"))
    .then(res=>dispatch({
        type: UPDATE_PASSWORD,
        payload: res.data
    }))
}
export const updateName = (name)=>dispatch=>{
    axios.put("http://localhost:8000/api/updateaccount/"+localStorage.getItem("userId"), {
        name: name
    }, console.log("NAME_UPDATING"))
    .then(res => dispatch({
        type: UPDATE_NAME,
        payload: res.data
    }))
}