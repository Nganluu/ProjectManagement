import GET_ALL_MEMBER from './types';

export const getAllMember = () => {
    dispatch({
        type: API_CALLING
    },
        console.log("GETTING_ALL_MEMBER")
    )
    axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem('token')
    axios.get("")
        .then(response => dispatch({
            type: GET_ALL_MEMBER,
            payload: response.data
        }))
}