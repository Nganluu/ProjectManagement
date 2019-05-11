import { GET_ALL_PROJECT, API_CALLING, ADD_NEW_PROJECT, GET_PROJECT_WITH_ID, UPDATE_PROJECT_NAME, DELETE_PROJECT, GET_PROJECT_USER, DELETE_PROJECT_USER, ADD_PROJECT_USER, HANDLE_ERROR } from "./types";
import axios from "axios";


export const getAllProject = () => dispatch => {
    dispatch({
        type: API_CALLING
    },
        console.log("GETTING__ALL_PROJECT")
    )
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.get("/api/allproject")
        .then(response => dispatch({
            type: GET_ALL_PROJECT,
            payload: response.data
        }))
}

export const getProjectWithId = (id) => dispatch => {
    dispatch({
        type: API_CALLING
    },
        console.log("GETTING_PROJECT_WITH_ID")
    )
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.get("/api/project/" + id)
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
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.post('/api/project', {
        project_name: project_name
    }).then(
        res => dispatch({
            type: ADD_NEW_PROJECT,
            payload: res.data
        })
    )
}

export const updateProjectName = (name, id) => dispatch => {
    dispatch({
        type: API_CALLING
    }, console.log("UPDATING_PROJECT_NAME"))

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.put('/api/project/' + id, {
        project_name: name
    }).then(res => dispatch({
            type: UPDATE_PROJECT_NAME,
            payload: res.data
        }))
    
}

export const deleteProject = (id) => dispatch => {
    dispatch({
        type: API_CALLING
    }, console.log("DELETING_PROJECT"));

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token');
    axios.delete('/api/project/' + id).then(res => dispatch({
            type: DELETE_PROJECT,
            payload: res.data
        }))

}

export const getProjectUser = (id) => dispatch=>{
    dispatch({
        type: API_CALLING
    }, console.log("GETTING_PROJECT_USER"))

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token');
    axios.get('/api/userproject/'+id)
    .then(res=>dispatch({
        type: GET_PROJECT_USER,
        payload: res.data
    }))
}

export const deleteProjectUser = (user_id, project_id)=>dispatch=>{
    dispatch({
        type: API_CALLING
    }, console.log("DELETING_PROJECT_USER"))

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token');
    axios.delete('/api/userproject', {data: {
        user_id: user_id,
        project_id: project_id
    }})
    .then(res => dispatch({
        type: DELETE_PROJECT_USER,
        payload: res.data
    }))
}
 export const addProjectUser = (email, project_id)=>dispatch=>{
     dispatch({
         type: API_CALLING
     }, console.log("ADDING_PROJECT_USER"))

     axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token');
     axios.post("/api/userproject",  {
         email: email,
         project_id: project_id
     }).then(res=>dispatch({
         type: ADD_PROJECT_USER,
         payload: res.data
     })).catch(function (error) {
        dispatch({
            type: HANDLE_ERROR,
            error: error.response.status
        })
    })
    }
