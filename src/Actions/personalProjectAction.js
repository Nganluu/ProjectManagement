import { GET_ALL_PERSONAL_PROJECT, GET_PERSONAL_PROJECT_WITH_ID, ADD_NEW_PERSONAL_PROJECT,
        UPDATE_PERSONAL_PROJECT_NAME, DELETE_PERSONAL_PROJECT, API_CALLING, GET_PTASK, 
        GET_PTASK_WITH_ID, HANDLE_ERROR_IN_GETTING_DETAIL_TASK, ADD_PTASK,
        DELETE_PTASK,
        UPDATE_PTASK_NAME,
        TICK_PTASK
    } from './types';
import axios from "axios";

export const getAllPersonalProject = () => dispatch => {
    dispatch({
        type: API_CALLING
    },
        console.log("GETTING_ALL_PERSONAL_PROJECT")
    )
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.get("/api/personal")
        .then(response => dispatch({
            type: GET_ALL_PERSONAL_PROJECT,
            payload: response.data
    }))
}

export const getPersonalProjectWithId = (id) => dispatch => {
    dispatch({
        type: API_CALLING
    },
        console.log("GETTING_PERSONAL_PROJECT_WITH_ID")
    )
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.get("/api/personal/" + id)
        .then(res => dispatch({
            type: GET_PERSONAL_PROJECT_WITH_ID,
            payload: res.data
        })
    )
}

export const addNewPersonalProject = (personal_name) => dispatch => {
    dispatch({
        type: API_CALLING
    },
        console.log("ADDING_NEW_PERSONAL_PROJECT")
    )
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.post('/api/personal', {
        personal_name: personal_name
    }).then(
        res => dispatch({
            type: ADD_NEW_PERSONAL_PROJECT,
            payload: res.data
        })
    )
}

export const updatePersonalProjectName = (name, id) => dispatch => {
    dispatch({
        type: API_CALLING
    }, console.log("UPDATING_PERSONAL_PROJECT_NAME"))

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.put('/api/personal/' + id, {
        personal_name: name
    }).then(res => dispatch({
            type: UPDATE_PERSONAL_PROJECT_NAME,
            payload: res.data
        })
    )
}

export const deletePersonalProject = (id) => dispatch => {
    dispatch({
        type: API_CALLING
    }, console.log("DELETING_PERSONAL_PROJECT"));

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token');
    axios.delete('/api/personal/' + id).then(res => dispatch({
            type: DELETE_PERSONAL_PROJECT,
            payload: res.data
        }))

}
//personal task in personal project
export const getAllPersonalTask = (id)=>dispatch =>{
    dispatch({
        type: API_CALLING
    }, console.log("GETTING_ALL_PERSONAL_TASK"))

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token');
    axios.get("/api/allptask/"+id).then(res=>dispatch({
        type: GET_PTASK,
        payload: res.data
    })).catch(function(error){
        dispatch({
            type: HANDLE_ERROR_IN_GETTING_DETAIL_TASK,
            error: error.response.status
        })
    })
}

export const getAllPersonalTaskWithId = (id)=>dispatch=>{
    dispatch({
        type: API_CALLING
    }, console.log("GETTING_ALL_PERSONAL_TASK_WITH_ID"))
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token');
    axios.get("api/ptask/"+id).then(res=>dispatch({
        type: GET_PTASK_WITH_ID,
        payload: res.data
    }))
}

export const addPersonalTask = (name, id)=>dispatch => {
    dispatch({
        type: API_CALLING
    }, console.log("ADDING_PERSONAL_TASK"))

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token');
    axios.post("/api/ptask", {
        p_task_name: name,
        personal_id: id
    }).then(res => dispatch({
        type: ADD_PTASK,
        payload: res.data
    }))
}

export const deletePersonalTask = (id)=>dispatch=>{
    dispatch({
        type: API_CALLING
    }, console.log("DELETING_PERSONAL_TASK"))
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token');
    axios.delete("/api/ptask/"+id).then(res=>dispatch({
        type: DELETE_PTASK,
        payload: res.data
    }))
}

export const updatePersonalTaskName = (id, name)=>dispatch=>{
    dispatch({
        type: API_CALLING
    }, console.log("UPDATING_PERSONAL_TASK"))
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token');
    axios.put("/api/ptask/"+id, {
        p_task_name: name,
    }).then(res=>dispatch({
        type: UPDATE_PTASK_NAME,
        payload: res.data
    }))
}

export const tickPersonalTask = (id, tick)=>dispatch=>{
    dispatch({
        type: API_CALLING
    }, console.log("TICK_PERSONAL_TASK"))
    
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token');
    axios.put("/api/ptask/"+id, {
        p_task_tick: tick,
    }).then(res=>dispatch({
        type: TICK_PTASK,
        payload: res.data
    }))
}