import { GET_ALL_JOB_GROUP, GET_JOB_GROUP_WITH_ID, ADD_NEW_JOB_GROUP,
        UPDATE_JOB_GROUP_NAME, DELETE_JOB_GROUP, API_CALLING
    } from '../Actions/types';

const iniState = {
callapidone: "",
jobGroupList: [],
jobGroupDetail: []
}

export default function jobGroupReducer(state=iniState, action){
    switch(action.type){
        case API_CALLING: 
            return{
            ...state,
            callapidone: false
            }

        case GET_ALL_JOB_GROUP: 
            if(action.payload.success)  {
                console.log("GET_ALL_JOB_GROUP_DONE");
                return {...state,
                    jobGroupList: action.payload.data,
                    callapidone: true 
                }
            } else {
                console.log(action.payload.message);
                return {
                    ...state,
                    callapidone: true
                }
            }

        case GET_JOB_GROUP_WITH_ID:
            if(action.payload.success) {
                console.log("GET_JOB_GROUP_WITH_ID_DONE");
                return {
                    ...state,
                    jobGroupDetail: action.payload.data,
                    callapidone: true
                }
            } else {
                console.log(action.payload.message);
                return {
                    ...state,
                    callapidone: true
                }
            }

        case ADD_NEW_JOB_GROUP: {
            if( action.payload.success) { console.log("ADD_NEW_JOB_GROUP_DONE")}
            return {
                ...state,
                callapidone: true
            }
        }

        case UPDATE_JOB_GROUP_NAME: 
            if(action.payload.success) {console.log("UPDATE_JOB_GROUP_NAME_DONE")}
            return {
                ...state,
                callapidone: true
            }

        case DELETE_JOB_GROUP: {
            if(action.payload.success) { console.log("DELETE_JOB_GROUP_DONE") }
            return {
                ...state,
                callapidone: true
            }
        }

        default: return state;
    }
}