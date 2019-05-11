import { GET_ALL_PERSONAL_PROJECT, GET_PERSONAL_PROJECT_WITH_ID, ADD_NEW_PERSONAL_PROJECT, HANDLE_GET_ALL_PERSONAL_ERROR,
        UPDATE_PERSONAL_PROJECT_NAME, DELETE_PERSONAL_PROJECT, API_CALLING, GET_PTASK, GET_PTASK_WITH_ID, HANDLE_ERROR_IN_GETTING_DETAIL_TASK, ADD_PTASK, DELETE_PTASK, UPDATE_PTASK_NAME, TICK_PTASK
    } from '../Actions/types';

const iniState = {
    callapidone: "",
    personalProjectList: [],
    personalProjectDetail: [],
    pTaskList: [],
    pTask: [],
    deleteSuccess: false
}

export default function projectReducer(state=iniState, action){
    switch(action.type){
        case API_CALLING: 
            return{
            ...state,
            callapidone: false
            }

    case GET_ALL_PERSONAL_PROJECT: 
        if(action.payload.success)  {
            console.log("GET_ALL_PERSONAL_PROJECT_DONE");
            return {...state,
                personalProjectList: action.payload.data,
                callapidone: true 
            }
        } else {
            console.log(action.payload.message);
            return {
                ...state,
                callapidone: true
            }
        }

    case HANDLE_GET_ALL_PERSONAL_ERROR: {
        console.log(action.error)
        return {
            ...state,
            personalProjectList:[],
            callapidone: true

        }
    }

    case GET_PERSONAL_PROJECT_WITH_ID:
        if(action.payload.success) {
            console.log("GET_PERSONAL_PROJECT_WITH_ID_DONE");
            return {
                ...state,
                personalProjectDetail: action.payload.data,
                callapidone: true
            }
        } else {
            console.log(action.payload.message);
            return {
                ...state,
                callapidone: true
            }
        }

    case ADD_NEW_PERSONAL_PROJECT: {
        if( action.payload.success) { console.log("ADD_NEW_PERSONAL_PROJECT_DONE")}
        return {
            ...state,
            callapidone: true
        }
    }

    case UPDATE_PERSONAL_PROJECT_NAME: 
        if(action.payload.success) {console.log("UPDATE_PERSONAL_PROJECT_NAME_DONE")}
        return {
            ...state,
            callapidone: true
        }

    case DELETE_PERSONAL_PROJECT: {
        if(action.payload.success) { console.log("DELETE_PERSONAL_PROJECT_DONE") }
        return {
            ...state,
            callapidone: true
        }
    }
    //personal task
    case GET_PTASK: 
        if(action.payload.success){console.log("GET_PTASK_DONE")}
        return {
            ...state,
            pTaskList: action.payload.data,
            callapidone: true
        }
    case GET_PTASK_WITH_ID: 
        if(action.payload.success){console.log("GET_PTASK_WITH_ID_DONE")}
        return {
            ...state,
            pTask: action.payload.data,
            callapidone: true
        }
    case HANDLE_ERROR_IN_GETTING_DETAIL_TASK:
        return {
            ...state,
            pTaskList: [],
            error: action.error,
            callapidone: true
        }
    case ADD_PTASK:
        if(action.payload.success) {console.log("ADD_PTASK_DONE")}
        return {
            ...state,
            callapidone: true

        }
    case DELETE_PTASK:
        if(action.payload.success) {console.log("DELETE_PTASK_DONE")}
        return {
            ...state,
            deleteSuccess: action.payload.success,
            callapidone: true
        }

    case UPDATE_PTASK_NAME:
        if(action.payload.success) {console.log("UPDATE_PTASK_DONE")}
        return {
            ...state, 
            callapidone: true
        }
    case TICK_PTASK: 
        if(action.payload.success) {console.log("TICK_PTASK_DONE")}
        return {
            ...state, 
            callapidone: true
        }
    default: return state;
    }
}

