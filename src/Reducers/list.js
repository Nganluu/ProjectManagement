import {ADD_NEW_PROJECT} from '../../Actions/types'

export default function list(state={}, action){
    switch(action.type){
        case ADD_NEW_PROJECT: 
        return {
            ...state,
           data: action.payload
        }
    }
}