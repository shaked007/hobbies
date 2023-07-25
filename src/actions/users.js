import axios from 'axios'

export const deleteUser = (userId)=> {
    return async (dispatch)=>{
        //ADD API DELETEUSER
        try{
            const deleteResponse =await axios.delete(`http://localhost:3000/users/${userId}`)
            dispatch({type:'DELETE_USER',payload:userId})
        }catch(err){

        }
     
    }
}


export const addUser = (user)=>{
    return async (dispatch)=>{
        dispatch({type:'ADD_USER_START'})
        //ADD API UPDATE USER
        try{
            const addUserResponse =  await axios.post('http://localhost:3000/users',user)
            dispatch({type:'ADD_USER_SUCCESS',payload:addUserResponse.data})

        }catch(err){

        }
       
    }
}

export const fetchUsers = ()=> {
    return async (dispatch) =>{
        dispatch({type:'FETCH_USERS_REQUEST'})
                try{
               const replay = await axios.get('http://localhost:3000/users')
              const finalData =  replay.data
               
               dispatch({type:'FETCH_USERS_SUCCESS',payload:finalData})

               
               
               }catch(err){
                dispatch({type:'FETCH_USERS_ERROR',payload:err.message})
               }            
        
            
    }
  
}
