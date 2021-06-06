import * as api from '../api';

//action creators are fun that return action
//redux thunk for async

// const getPost = ()=>{
//     const action = {type: 'FETCH_ALL', payload: []}

//     return action;
// }
export const getPost = ()=>async (dispatch)=>{

    try {
        const {data} = await api.fetchPost();

        dispatch({type: 'FETCH_ALL', payload: data});
    } catch (error) {
        console.log(error.message);
    }

}

export const createPost = (post) => async (dispatch)=>{ //async dispatch is redux thunk
    try {
        const { data } = await api.createPost(post);

        dispatch({type:"CREATE", payload:data})
        
    } catch (error) {
        console.log(error);
    }
}

export const updatePost = (id, post) => async(dispatch)=>{
     try {
         const {data} = await api.updatePost(id, post);

         dispatch({type: 'UPDATE', payload: data})
     } catch (error) {
         console.log(error);
     }

}

export const deletePost = (id) => async (dispatch) => {
    try {
        await api.deletePost(id);

        dispatch({type:'Delete', payload:id});
    } catch (error) {
        console.log(error);
    }
}