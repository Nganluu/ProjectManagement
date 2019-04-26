import { GET_PROJECT, API_CALLING } from "../Actions/types";


const iniState = {
    callapidone: ""
}

export default function projectReducer(state=iniState, action){
    switch(action.type){
        case API_CALLING: 
        return{
            ...state,
            callapidone: false
        }
        case GET_PROJECT: 
          if(action.payload.success)  {console.log("GET_PROJECT_DONE")}
            return {...state,
                projectList: action.payload.data,
                callapidone: true 
            }
            
        default: return state
    }
}