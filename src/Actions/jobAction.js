import { GET_ALL_JOB, GET_JOB_WITH_ID, ADD_NEW_JOB, UPDATE_JOB, DELETE_JOB, API_CALLING} from "./types";
import axios from "axios";

export const getAllJob = (id) => dispatch => {
    dispatch({
        type: API_CALLING
    },
        console.log("GETTING_JOB_GROUP")
    )
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.get("/api/alljob/" + id)
        .then(response => dispatch({
            type: GET_ALL_JOB,
            payload: response.data
        })
    )
}

export const getJobWithId = (id) => dispatch => {
    dispatch({
        type: API_CALLING
    },
        console.log("GETTING_JOB_WITH_ID")
    )
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.get("/api/job/" + id)
        .then(res => dispatch({
            type: GET_JOB_WITH_ID,
            payload: res.data
        })
    )
}

export const addNewJob = (job_group_id, job_name, start_date, end_date) => dispatch => {
    dispatch({
        type: API_CALLING
    },
        console.log("ADDING_NEW_JOB")
    )
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.post('/api/job', {
        job_group_id: job_group_id,
        job_name: job_name,
        start_date: start_date,
        end_date: end_date
    }).then(
        res => dispatch({
            type: ADD_NEW_JOB,
            payload: res.data
        })
    )
}

export const updateJob = (id, name, start_date, end_date) => dispatch => {
    dispatch({
        type: API_CALLING
    }, console.log("UPDATING_JOB"))

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.put('/api/job/' + id, {
        job_name: name,
        start_date: start_date,
        end_date: end_date
    }).then(res => dispatch({
            type: UPDATE_JOB,
            payload: res.data
        })
    )
}

export const deleteJob = (id) => dispatch => {
dispatch({
    type: API_CALLING
}, console.log("DELETING_JOB"));

axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token');
axios.delete('/api/jobg/' + id).then(res => dispatch({
        type: DELETE_JOB,
        payload: res.data
    })
)
}

