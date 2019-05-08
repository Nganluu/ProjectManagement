import { GET_ALL_MEMBER_JOB, ADD_NEW_MEMBER_JOB, DELETE_MEMBER_JOB, API_CALLING, HANDLE_GET_ALL_MEMBER_JOB_ERROR} from "./types";
import axios from "axios";

export const getAllMemberJob = (id) => dispatch => {
    dispatch({
        type: API_CALLING
    },
        console.log("GETTING_ALL_MEMBER_JOB")
    )
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.get("/api/userjob/" + id)
        .then(response => dispatch({
                type: GET_ALL_MEMBER_JOB,
                payload: response.data
            })
        ).catch(function (error) {
            dispatch({
                type: HANDLE_GET_ALL_MEMBER_JOB_ERROR,
                error: error.response.status,
                memberJobList: []
            })
        })
}

export const addNewMemberJob = (job_id, user_id) => dispatch => {
    dispatch({
        type: API_CALLING
    },
        console.log("ADDING_NEW_MEMBER_JOB")
    )
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.post('/api/userjob', {
        job_id: job_id,
        user_id: user_id
    }).then(
        res => dispatch({
            type: ADD_NEW_MEMBER_JOB,
            payload: res.data
        })
    )
}

export const deleteMemberJob = (job_id, user_id) => dispatch => {
dispatch({
    type: API_CALLING
}, console.log("DELETING_JOB"));

axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token');
axios.delete('/api/userjob', {
    data: {
        job_id: job_id,
        user_id: user_id
    }
}).then(res => dispatch({
        type: DELETE_MEMBER_JOB,
        payload: res.data
    })
)
}

