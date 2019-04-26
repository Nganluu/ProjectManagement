import { GET_PROJECT, API_CALLING } from "./types";
import axios from "axios";


export const getProject = () => dispatch => {
    dispatch({
        type: API_CALLING
    },
    console.log("GETTING_PROJECT")
    )
    axios.defaults.headers.common['Authorization']="Bearer "+localStorage.getItem('token')
    axios.get("/api/allproject")
        .then(response => dispatch({
            type: GET_PROJECT,
            payload: response.data
        }))
}