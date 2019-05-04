import { GET_ALL_TASK, GET_TASK_WITH_ID, ADD_NEW_TASK, UPDATE_TASK, DELETE_TASK, API_CALLING} from "./types";
import axios from "axios";

export const getAllTask = (id) => dispatch => {
    dispatch({
        type: API_CALLING
    },
        console.log("GETTING_ALL_TASK")
    )
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.get("/api/alltask/" + id)
        .then(response => dispatch({
            type: GET_ALL_TASK,
            payload: response.data
        })
    )
}

export const getTaskWithId = (id) => dispatch => {
    dispatch({
        type: API_CALLING
    },
        console.log("GETTING_TASK_WITH_ID")
    )
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.get("/api/task/" + id)
        .then(res => dispatch({
            type: GET_TASK_WITH_ID,
            payload: res.data
        })
    )
}

export const addNewTask = (job_id, task_name) => dispatch => {
    dispatch({
        type: API_CALLING
    },
        console.log("ADDING_NEW_TASK")
    )
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.post('/api/task', {
        job_id: job_id,
        task_name: task_name
    }).then(
        res => dispatch({
            type: ADD_NEW_TASK,
            payload: res.data
        })
    )
}

export const updateTaskName = (id, name) => dispatch => {
    dispatch({
        type: API_CALLING
    }, console.log("UPDATING_TASK_NAME"))

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.put('/api/task/' + id, {
        task_name: name
    }).then(res => dispatch({
            type: UPDATE_TASK,
            payload: res.data
        })
    )
}

export const updateTaskTick = (id, task_tick) => dispatch => {
    dispatch({
        type: API_CALLING
    }, console.log("UPDATING_JOB_END_DATE"))

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.put('/api/task/' + id, {
        task_tick: task_tick 
    }).then(res => dispatch({
            type: UPDATE_TASK,
            payload: res.data
        })
    )
}

export const deleteTask = (id) => dispatch => {
dispatch({
    type: API_CALLING
}, console.log("DELETING_TASK"));

axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token');
axios.delete('/api/task/' + id).then(res => dispatch({
        type: DELETE_TASK,
        payload: res.data
    })
)
}

