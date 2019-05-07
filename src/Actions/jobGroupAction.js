import { GET_ALL_JOB_GROUP, GET_JOB_GROUP_WITH_ID, ADD_NEW_JOB_GROUP, 
        UPDATE_JOB_GROUP_NAME, DELETE_JOB_GROUP, API_CALLING, HANDLE_GET_ALL_ERROR
    } from "./types";
import axios from "axios";


export const getAllJobGroup = (id) => dispatch => {
    dispatch({
        type: API_CALLING
    },
        console.log("GETTING_ALL_JOB_GROUP")
    )
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.get("/api/alljobgroup/" + id)
        .then(response => dispatch({
            type: GET_ALL_JOB_GROUP,
            payload: response.data
        })).catch(function (error) {
            dispatch({
                type: HANDLE_GET_ALL_ERROR,
                error: error.response.status,
                jobGroupList: []
            })
        })
}

export const getJobGroupWithId = (id) => dispatch => {
    dispatch({
        type: API_CALLING
    },
        console.log("GETTING_JOB_GROUP_WITH_ID")
    )
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.get("/api/jobgroup/" + id)
        .then(res => dispatch({
            type: GET_JOB_GROUP_WITH_ID,
            payload: res.data
        }))
}

export const addNewJobGroup = (project_id, job_group_name) => dispatch => {
    dispatch({
        type: API_CALLING
    },
        console.log("ADDING_NEW_JOB_GROUP")
    )
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.post('/api/jobgroup', {
        project_id: project_id,
        job_group_name: job_group_name
    }).then(
        res => dispatch({
            type: ADD_NEW_JOB_GROUP,
            payload: res.data
        })
    )
}

export const updateJobGroupName = (name, id) => dispatch => {
    dispatch({
        type: API_CALLING
    }, console.log("UPDATING_JOB_GROUP_NAME"))

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.put('/api/jobgroup/' + id, {
        job_group_name: name
    }).then(res => dispatch({
            type: UPDATE_JOB_GROUP_NAME,
            payload: res.data
        }))
    
}

export const deleteJobGroup = (id) => dispatch => {
    dispatch({
        type: API_CALLING
    }, console.log("DELETING_JOB_GROUP"));

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token');
    axios.delete('/api/jobgroup/' + id).then(res => dispatch({
            type: DELETE_JOB_GROUP,
            payload: res.data
        })
    )
}

