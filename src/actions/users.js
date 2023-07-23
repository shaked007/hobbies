import axios from 'axios'

export const deleteUser = (userId)=> {
    return async (dispatch)=>{
        //ADD API DELETEUSER

        const users = JSON.parse(localStorage.getItem('users'))
        const updatedUserArray = users.filter((user)=>user.id !== userId)

        localStorage.setItem('users',JSON.stringify(updatedUserArray))
        dispatch({type:'DELETE_USER',payload:userId})
    }
}


export const addUser = (user)=>{
    return async (dispatch)=>{
        dispatch({type:'ADD_USER_START'})
        //ADD API UPDATE USER


        const users= JSON.parse(localStorage.getItem('users'))
        
        localStorage.setItem('users',JSON.stringify([...users,user]))
        dispatch({type:'ADD_USER_SUCCESS',payload:user})
    }
}

export const fetchUsers = ()=> {
    return async (dispatch) =>{
        dispatch({type:'FETCH_USERS_REQUEST'})
            if(!localStorage.getItem('users')){
                try{
               const replay = await axios.get('https://randomuser.me/api/?results=10')
              const finalData =  replay.data.results.map((user)=>{
                let {id,name,location,email,picture} = user 
                id =id.value
                picture = picture.large
                name = name.title + ' ' + name.first + ' ' + name.last 
                location = location.city;
                return {id,name,location,email,picture}
               })
               
               dispatch({type:'FETCH_USERS_SUCCESS',payload:finalData})

               localStorage.setItem('users',JSON.stringify(finalData))
               
               }catch(err){
                dispatch({type:'FETCH_USERS_ERROR',payload:err.message})
               }            
            }else{
                dispatch({type:'FETCH_USERS_SUCCESS',payload:JSON.parse(localStorage.getItem('users'))})
            }
            
    }
  
}
