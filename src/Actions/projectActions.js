import { GET_ALL_PROJECT, API_CALLING, ADD_NEW_PROJECT, GET_PROJECT_WITH_ID } from "./types";
import axios from "axios";


export const getAllProject = () => dispatch => {
    dispatch({
        type: API_CALLING
    },
    console.log("GETTING__ALL_PROJECT")
    )
    axios.defaults.headers.common['Authorization']="Bearer "+localStorage.getItem('token')
    axios.get("/api/allproject")
        .then(response => dispatch({
            type: GET_ALL_PROJECT,
            payload: response.data
        }))
}
export const getProjectWithId = (id)=>dispatch=>{
    dispatch({
        type: API_CALLING
    },
    console.log("GETTING_PROJECT_WITH_ID")
    )
    axios.defaults.headers.common['Authorization']="Bearer "+localStorage.getItem('token')
    axios.get("/api/project/"+id)
    .then(res => dispatch({
        type: GET_PROJECT_WITH_ID,
        payload: res.data
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