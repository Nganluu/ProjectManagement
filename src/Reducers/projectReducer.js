import { GET_ALL_PROJECT, API_CALLING, ADD_NEW_PROJECT, GET_PROJECT_WITH_ID,
             UPDATE_PROJECT_NAME, DELETE_PROJECT, GET_PROJECT_USER, DELETE_PROJECT_USER 
        } from "../Actions/types";


const iniState = {
    callapidone: "",
    projectList: [],
    projectUser : [],
    projectDetail: []
}

export default function projectReducer(state=iniState, action){
    switch(action.type){
        case API_CALLING: 
        return{
            ...state,
            callapidone: false
        }

        case GET_ALL_PROJECT: 
          if(action.payload.success)  {console.log("GET_ALL_PROJECT_DONE")}
            return {...state,
                projectList: action.payload.data,
                callapidone: true 
            }

        case GET_PROJECT_WITH_ID:
            if(action.payload.success) {console.log("GET_PROJECT_WITH_ID_DONE")}
            return {
                ...state,
                projectDetail: action.payload.data,
                callapidone: true
            }

        case ADD_NEW_PROJECT: {
            if( action.payload.success) { console.log("ADD_NEW_PROJECT_DONE")}
            return {
                ...state,
                callapidone: true
            }
        }

        case UPDATE_PROJECT_NAME: 
            if(action.payload.success) {console.log("UPDATE_PROJECT_NAME_DONE")}
            return {
                ...state,
                callapidone: true
            }

        case DELETE_PROJECT: {
            if(action.payload.success) { console.log("DELETE_PROJECT_DONE") }
            return {
                ...state,
                callapidone: true
            }
        }
        case GET_PROJECT_USER:
            if(action.payload.success) {console.log("GET_PROJECT_USER_DONE")}
            return {
                ...state,
                projectUser: action.payload.data,
                callapidone: true
            }
        case DELETE_PROJECT_USER:
            if(action.payload.success) {console.log("DELETE_PROJECT_USER_DONE")}
            return {
                ...state,
                callapidone: true
            }
        default: 
            return state
    }
}