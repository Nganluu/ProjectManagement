import { GET_ALL_COMMENT, GET_COMMENT_WITH_ID, ADD_NEW_COMMENT, UPDATE_COMMENT, DELETE_COMMENT, API_CALLING, HANDLE_GET_ALL_COMMENT_ERROR } from '../Actions/types';

const iniState = {
callapidone: "",
commentList: [],
commentDetail: []
}

export default function jobReducer(state=iniState, action){
switch(action.type){
    case API_CALLING: 
        return{
        ...state,
        callapidone: false
        }

    case GET_ALL_COMMENT: 
        if(action.payload.success)  {
            console.log("GET_ALL_COMMENT_DONE");
            return {...state,
                commentList: action.payload.data,
                callapidone: true 
            }
        } else {
            console.log(action.payload.message);
            return {
                ...state,
                callapidone: true
            }
        }

        case HANDLE_GET_ALL_COMMENT_ERROR: {
            console.log(action.error);
            return {
                ...state,
                commentList: action.commentList
            }
        }

    case GET_COMMENT_WITH_ID:
        if(action.payload.success) {
            console.log("GET_COMMENT_WITH_ID_DONE");
            return {
                ...state,
                commentDetail: action.payload.data,
                callapidone: true
            }
        } else {
            console.log(action.payload.message);
            return {
                ...state,
                callapidone: true
            }
        }

    case ADD_NEW_COMMENT: {
        if( action.payload.success) { console.log("ADD_NEW_COMMENT_DONE")}
        return {
            ...state,
            callapidone: true
        }
    }

    case UPDATE_COMMENT: 
        if(action.payload.success) {console.log("UPDATE_COMMENT_DONE")}
        return {
            ...state,
            callapidone: true
        }

    case DELETE_COMMENT: {
        if(action.payload.success) { console.log("DELETE_COMMENT_DONE") }
        return {
            ...state,
            callapidone: true
        }
    }

    default: return state;
}
}