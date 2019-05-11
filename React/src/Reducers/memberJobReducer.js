import { GET_ALL_MEMBER_JOB, ADD_NEW_MEMBER_JOB, DELETE_MEMBER_JOB, API_CALLING, HANDLE_GET_ALL_MEMBER_JOB_ERROR } from '../Actions/types';

const iniState = {
    callapidone: "",
    memberJobList: []
}

export default function jobReducer(state=iniState, action){
switch(action.type){
    case API_CALLING: 
        return{
        ...state,
        callapidone: false
        }

    case GET_ALL_MEMBER_JOB: 
        if(action.payload.success)  {
            console.log("GET_ALL_MEMBER_JOB_DONE");
            return {...state,
                memberJobList: action.payload.data,
                callapidone: true 
            }
        } else {
            console.log(action.payload.message);
            return {
                ...state,
                callapidone: true
            }
        }

        case HANDLE_GET_ALL_MEMBER_JOB_ERROR: {
            console.log(action.error);
            return {
                ...state,
                memberJobList: action.memberJobList
            }
        }

    case ADD_NEW_MEMBER_JOB: {
        if( action.payload.success) { console.log("ADD_NEW_MEMBER_JOB_DONE")}
        return {
            ...state,
            callapidone: true
        }
    }

    case DELETE_MEMBER_JOB: {
        if(action.payload.success) { console.log("DELETE_MEMBER_JOB_DONE") }
        return {
            ...state,
            callapidone: true
        }
    }

    default: return state;
}
}