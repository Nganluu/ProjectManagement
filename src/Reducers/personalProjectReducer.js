import { GET_ALL_PERSONAL_PROJECT, GET_PERSONAL_PROJECT_WITH_ID, ADD_NEW_PERSONAL_PROJECT,
        UPDATE_PERSONAL_PROJECT_NAME, DELETE_PERSONAL_PROJECT, API_CALLING
    } from '../Actions/types';

const iniState = {
callapidone: "",
personalProjectList: [],
personalProjectDetail: []
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

    default: return state;
    }
}