import { GET_PROJECT, API_CALLING, ADD_NEW_PROJECT } from "./types";
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

export const addNewProject = (project_name) => dispatch => {
    dispatch({
        type: API_CALLING
    },
    console.log("ADDING_NEW_PROJECT")
    )
    axios.defaults.headers.common['Authorization']="Bearer "+localStorage.getItem('token')
    axios.post('/api/project',{
        project_name: project_name
    }).then(
        res => dispatch({
            type: ADD_NEW_PROJECT,
            payload: res.data
        })
    )
}