import {GET_ALL_MEMBER, API_CALLING} from './types';
import axios from 'axios'

export const getAllMember = ()=>dispatch => {
    dispatch({
        type: API_CALLING
    },
        console.log("GETTING_ALL_MEMBER")
    )
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.get("")
        .then(response => dispatch({
            type: GET_ALL_MEMBER,
            payload: response.data
        }))
}