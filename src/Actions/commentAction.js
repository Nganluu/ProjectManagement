import { GET_ALL_COMMENT, GET_COMMENT_WITH_ID, ADD_NEW_COMMENT, UPDATE_COMMENT, DELETE_COMMENT, HANDLE_GET_ALL_COMMENT_ERROR, API_CALLING} from "./types";
import axios from "axios";

export const getAllComment = (id) => dispatch => {
    dispatch({
        type: API_CALLING
    },
        console.log("GETTING_ALL_COMMENT")
    )
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.get("/api/allcomment/" + id)
        .then(response => dispatch({
                type: GET_ALL_COMMENT,
                payload: response.data
            })
        ).catch(function (error) {
            dispatch({
                type: HANDLE_GET_ALL_COMMENT_ERROR,
                error: error.response.status,
                commentList: []
            })
        })
}

export const getJobCommentId = (id) => dispatch => {
    dispatch({
        type: API_CALLING
    },
        console.log("GETTING_COMMENT_WITH_ID")
    )
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.get("/api/comment/" + id)
        .then(res => dispatch({
            type: GET_COMMENT_WITH_ID,
            payload: res.data
        })
    )
}

export const addNewComment = ( job_id, content ) => dispatch => {
    dispatch({
        type: API_CALLING
    },
        console.log("ADDING_NEW_COMMENT")
    )
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.post('/api/comment', {
        job_id: job_id,
        content: content
    }).then(
        res => dispatch({
            type: ADD_NEW_COMMENT,
            payload: res.data
        })
    )
}

export const updateComment = (id, content) => dispatch => {
    dispatch({
        type: API_CALLING
    }, console.log("UPDATING_COMMENT"))

    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.put('/api/comment/' + id, {
        content: content
    }).then(res => dispatch({
            type: UPDATE_COMMENT,
            payload: res.data
        })
    )
}

export const deleteComment = (id) => dispatch => {
dispatch({
    type: API_CALLING
}, console.log("DELETING_COMMENT"));

axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token');
axios.delete('/api/comment/' + id).then(res => dispatch({
        type: DELETE_COMMENT,
        payload: res.data
    })
)
}

