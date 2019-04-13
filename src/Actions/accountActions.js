import axios from 'axios';
import { USER_SIGNUP, USER_LOGIN, UPDATE_PASSWORD, UPDATE_NAME, LOGIN_ERROR, UPDATE_PASSWORD_ERROR, API_CALLING } from './types'

export const userSignup = (name, email, password) => dispatch => {
    dispatch({
        type: API_CALLING
    },
    console.log("REGISTER_FETCHING"))
    axios.post('/api/register/', {
        name: name,
        email: email,
        password: password
    }, 
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
    dispatch({
        type: API_CALLING
    },
    console.log("LOGIN_FETCHING"))
    
    axios.post("/api/login", {
        email: email,
        password: password
    },
        console.log("LOGIN_FETCHING")
    ).then(
        res => dispatch({
            type: USER_LOGIN,
            payload: res.data,
        })
    ).catch(function (error) {
        dispatch({type: LOGIN_ERROR, error: error.response.status})
    });
}
export const updatePassword = (password, newpassword)=>dispatch=>{
    dispatch({
        type: API_CALLING
    },
    console.log("PASSWORD_UPDATING"))

    axios.put("http://localhost:8000/api/updatepassword/"+localStorage.getItem("userId"), {
            password: password,
            new_password: newpassword
    }, console.log("PASSWORD_UPDATING"))
    .then(res=>dispatch({
        type: UPDATE_PASSWORD,
        payload: res.data
    })).catch(function (error) {
        dispatch({type: UPDATE_PASSWORD_ERROR, error: error.response.status})
    });
}
export const updateName = (name)=>dispatch=>{
    dispatch({
        type: API_CALLING
    },
    console.log("NAME_UPDATING"))
    axios.put("/api/updateaccount/"+localStorage.getItem("userId"), {
        name: name
    })
    .then(res => dispatch({
        type: UPDATE_NAME,
        payload: res.data
    }))
}