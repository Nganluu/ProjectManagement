import { GET_ALL_JOB, GET_JOB_WITH_ID, SHOW_HISTORY, ADD_NEW_JOB, UPDATE_JOB, DELETE_JOB, API_CALLING, HANDLE_GET_ALL_JOB_ERROR, HANDLE_GET_ALL_HISTORY_ERROR } from '../Actions/types';

const iniState = {
callapidone: "",
jobList: [],
jobDetail: {},
historyList: []
}

export default function jobReducer(state=iniState, action){
switch(action.type){
    case API_CALLING: 
        return{
        ...state,
        callapidone: false
        }

    case GET_ALL_JOB: 
        if(action.payload.success)  {
            console.log("GET_ALL_JOB_DONE");
            return {...state,
                jobList: action.payload.data,
                callapidone: true 
            }
        } else {
            console.log(action.payload.message);
            return {
                ...state,
                callapidone: true
            }
        }

        case HANDLE_GET_ALL_JOB_ERROR: {
            console.log(action.error);
            return {
                ...state,
                jobList: action.jobList
            }
        }

    case GET_JOB_WITH_ID:
        if(action.payload.success) {
            console.log("GET_JOB_WITH_ID_DONE");
            return {
                ...state,
                jobDetail: action.payload.data,
                callapidone: true
            }
        } else {
            console.log(action.payload.message);
            return {
                ...state,
                callapidone: true
            }
        }

        case SHOW_HISTORY: 
        if(action.payload.success)  {
            console.log("GET_ALL_JOB_DONE");
            return {...state,
                historyList: action.payload.data,
                callapidone: true 
            }
        } else {
            console.log(action.payload.message);
            return {
                ...state,
                callapidone: true
            }
        }

        case HANDLE_GET_ALL_JOB_ERROR: {
            console.log(action.error);
            return {
                ...state,
                historyList: action.historyList
            }
        }

    case ADD_NEW_JOB: {
        if( action.payload.success) { console.log("ADD_NEW_JOB_DONE")}
        return {
            ...state,
            callapidone: true
        }
    }

    case UPDATE_JOB: 
        if(action.payload.success) {console.log("UPDATE_JOB_DONE")}
        return {
            ...state,
            callapidone: true
        }

    case DELETE_JOB: {
        if(action.payload.success) { console.log("DELETE_JOB_DONE") }
        return {
            ...state,
            callapidone: true
        }
    }

    default: return state;
}
}