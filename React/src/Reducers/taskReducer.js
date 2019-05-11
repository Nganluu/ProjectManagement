import { GET_ALL_TASK, GET_TASK_WITH_ID, ADD_NEW_TASK, UPDATE_TASK, DELETE_TASK, API_CALLING, HANDLE_GET_ALL_TASK_ERROR} from '../Actions/types';

const iniState = {
    callapidone: "",
    taskList: [],
    taskDetail: []
}

export default function taskReducer(state=iniState, action){
    switch(action.type){
        case API_CALLING: 
            return{
            ...state,
            callapidone: false
            }

        case GET_ALL_TASK: 
            if(action.payload.success)  {
                console.log("GET_ALL_TASK_DONE");
                return {...state,
                    taskList: action.payload.data,
                    callapidone: true 
                }
            } else {
                console.log(action.payload.message);
                return {
                    ...state,
                    callapidone: true
                }
            }

        case HANDLE_GET_ALL_TASK_ERROR: {
            console.log(action.error);
            return {
                ...state,
                taskList: action.taskList
            }
        }

        case GET_TASK_WITH_ID:
            if(action.payload.success) {
                console.log("GET_TASK_WITH_ID_DONE");
                return {
                    ...state,
                    taskDetail: action.payload.data,
                    callapidone: true
                }
            } else {
                console.log(action.payload.message);
                return {
                    ...state,
                    callapidone: true
                }
            }

        case ADD_NEW_TASK: {
            if( action.payload.success) { console.log("ADD_NEW_TASK_DONE")}
            return {
                ...state,
                callapidone: true
            }
        }

        case UPDATE_TASK: 
            if(action.payload.success) {console.log("UPDATE_TASK_DONE")}
            return {
                ...state,
                callapidone: true
            }

        case DELETE_TASK: {
            if(action.payload.success) { console.log("DELETE_TASK_DONE") }
            return {
                ...state,
                callapidone: true
            }
        }

        default: return state;
    }
}