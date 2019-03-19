import axios from 'axios'
import { ADD_NEW_PROJECT } from './types';

export const addNewProject = (prjName, prjCategory, prjUser)=>dispatch=>{
    axios.post('',{
        project_name: prjName,
        project_category: prjCategory,
        user_id: prjUser
    }).then(
        res => dispatch({
            type: ADD_NEW_PROJECT,
            payload: res.data
        })
    )
    }